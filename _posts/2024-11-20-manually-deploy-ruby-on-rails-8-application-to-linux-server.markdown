---
layout: post
title: "Manually deploy Ruby on Rails 8 application to Linux server"
category: false
---

<div style="border: 1px solid #5abf73; background-color: #b8edc6; padding: 0.5rem 1rem; text-align: center; margin-bottom: 1.5rem; border-radius: 0.45rem;">
  This is a draft
</div>

This article describes how you can manually deploy your Ruby on Rails 8 application on a Linux Server with as few dependencies as possible. It's all manual, there is no automations [Kamal](https://www.kamal-deploy-org), [Docker](https://www.docker.com) or [Thruster](https://github.com/basecamp/thruster) in this way of deployment.

## Before continuing, here are few things you need to understand

- In this article, `example.com` will be used as a placeholder for your own domain or IP-address
- You have to configure the firewall
- You have to secure the SSH server
- You have a SSH public key on your own local development machine
- Configure DNS-records so that your domain's A-record resolves into server's IP-address
- This article assumes you are using Ubuntu Linux, these instructions will not work if you're using any other Linux distribution
- Please consider this article as **"some guy wrote in Internet"**-level information, use your own judgement and common sense
- You can host multiple Ruby on Rails applications in same server by using this method, but you have to understand that apps are deployed using same unix user `deploy` and therefore are able to write each other directories
- Finally the disclaimer: If you follow the instructions of this article, you will do it at your own risk -- I will take no responsibility at all

Now that I'm safe for any legal proceedings, let's continue 😅

## The deployment consists of following building blocks

- **Firewall** - Allows at least HTTPS and HTTP requests, configuring firewall is out of scope of this article
- **Nginx** - Webserver which handles the requests from the browser, and routes the requests into Puma application server or directly serves static assets from assets directory
- **Puma** - Application server which runs your Ruby on Rails application
- **SQLite3** - Database server which is embedded into your Ruby on Rails application
- **Static assets** - Your Ruby on Rails application has `public/` directory, Nginx will serve these assets directly without using Puma
- **Let's Encrypt** - Generate SSL certificates so you can use HTTPS

<div style="width: 100%; text-align: center;">
  <img style="width: 50%;" src="/images/simple-deployment-architecture.png">
</div>

## Creating the deploy user

In this step, you have to connect to your server as root user and create the `deploy` user.

```bash
adduser --disabled-password deploy
usermod -aG sudo deploy
```

Create a directory for your SSH files and your public key file.

```bash
mkdir -p /home/deploy/.ssh
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
```

Append the contents of your SSH public key into `/home/deploy/.ssh/authorized_keys`, most likely the file will be empty or you have to create it.

If you want to know more, head to SSH's website for details about [public-key authentication](https://www.ssh.com/academy/ssh/public-key-authentication).

## Setting up the server

First, let's try the public key authentication. Use SSH to connect your server as `deploy`-user:

```bash
$ ssh deploy@example.com
```

If you see Ubuntu Linux welcome message, you are good to go!

```
$ ssh deploy@example.com
Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 5.15.0-122-generic aarch64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

...
<<-- clip -->>
...

Last login: Thu Nov 21 15:25:13 2024 from 12.34.56.78
deploy@example.com:~$
```

Let's install few packages that you are going to need. We're going to use `sudo` command which runs the commands as `root`-user.

```shell
$ sudo apt update
$ sudo apt install -y curl git-core nginx nodejs npm yarn ruby-full build-essential libsqlite3-dev
```

This will install Git, Nginx, NodeJS, Yarn, Npm, development libraries and SQLite3.

## Hosting website via Nginx

To find out if Nginx is already running on your server, use combination of commands `ps` and `grep` like this `ps aux | grep nginx`. If it is running, the output looks like this:

```bash
$ ps aux | grep nginx
root       59329  0.0  0.0  65920  2436 ?        Ss   Nov17   0:00 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
www-data   59330  0.0  0.2  67016 11432 ?        S    Nov17   0:15 nginx: worker process
www-data   59331  0.0  0.2  66908 11056 ?        S    Nov17   0:00 nginx: worker process
```

### Adding a web site to Nginx

In Ubuntu Linux, Nginx web server lives in `/etc/nginx/`-directory. The main configuration file is `/etc/nginx/nginx.conf`.

To keep the main configuration file clean and simple, there are `/etc/nginx/sites-available` and `/etc/nginx/sites-enabled` directories to store the site-specific configuration files. They are also known as virtual hosts, you can have multiple virtual hosts running on one server. For example, you can have `example.com` and `anotherexample.com` sites running in one Nginx server. It also means you can run multiple Ruby on Rails applications in one server, as long as the server has enough memory and CPU capacity.

## Securing the connection with Let's Encrypt

<div  style="border: 1px solid #bf9d5a; background-color: #eddbb8; padding: 0.5rem 1rem; margin-bottom: 1.5rem; border-radius: 0.45rem;">
  Please note, you need a server with public IP-address and a domain name pointing to that IP-adddress in order to continue.
</div>

In order to secure the HTTP connection, you need to have SSL sertificate. Let's Encrypt is a non-profit organization that provides free SSL-sertificates and they have a tools to automatically provision the sertificates. Before Let's Encrypt, SSL sertificate management was hard and painful, and you had to buy the sertificate from commercial certificate authority.

With Let's Encrypt, you just run few unix commands and you have a working SSL-sertificate securing your web applications. ❤️

Install a tool called `certbot` for certificate management. Follow the [installation instructions](https://certbot.eff.org/instructions?ws=nginx&os=ubuntubionic) on Certbot homepage.

Once you installed a SSL certificate, make sure to test it with your browser. If you see a lock-symbol (🔒) on start of the address bar, you have HTTPS-connection.

## Nginx configuration

This is the Nginx configuration file for Ruby on Rails application. It is located in `/etc/nginx/sites-available` and then it's symlinked to `/etc/nginx/sites-enabled`.

It has following directives:
- Defines the domains to listen for (in this case, it's masterlist.fi)
- Configures the socket file to communicate with Puma
- Let's Encrypt SSL configuration
- Directive to server static assets directly from Nginx (no need for Puma to handle those)

Example Nginx virtual host file:

```
# /etc/nginx/sites-available/masterlist

upstream rails_app {
    server unix:///var/www/apps/masterlist/tmp/sockets/puma.sock fail_timeout=0;
}

server {
    server_name masterlist.fi;
    root /var/www/apps/masterlist/current/public;

    location ^~ /assets/ {
        gzip_static on;
        expires max;
        add_header Cache-Control public;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    location / {
        proxy_pass http://rails_app;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_redirect off;

        # WebSocket support (if needed)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/masterlist.fi/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/masterlist.fi/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = masterlist.fi) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name masterlist.fi;
    return 404; # managed by Certbot
}
```
To test if the configuration files are valid, run the following:

```bash
$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

If everything is working, you need to restart Nginx by `sudo service nginx restart`. To see the status of Nginx, you can use `sudo service nginx status` command.

Finally, you can test if the web server is responding by browsing to https://example.com, remember to use your own domain.

## Running you Ruby on Rails application with Puma

### Installing Ruby for your deploy user

Your need Ruby to run your Ruby on Rails application, and you need to run Ruby as `deploy`-user. In order to have total control for your Ruby installation, you need to install it via Ruby package managers.

So first, let's install `rbenv`, a Ruby version manager.

Follow [the installation instructions](https://github.com/rbenv/rbenv?tab=readme-ov-file#basic-git-checkout) on rbenv homepage and come back to this article once you have Ruby running. Remember to install Ruby into your `deploy` user.

You can check if Ruby was installed correctly by running `which ruby`, the output should be:

```bash
bob@example:~$ which ruby
/home/deploy/.rbenv/shims/ruby
```

### Configuring Puma

Puma needs some instructions so it can run your web application, so you need to create a file called `config/puma.rb` and add some instructions.

In the example file below, the Puma is configured to communicate to Nginx using sockets. Log files will be written into `tmp/`-directory in your application root directory.

Word of warning, I have given zero thoughts on thread configuration, soso regarding thread counts for your appication, you have to do your own research. This file has some good defaults, so it's a good starting point.

```ruby
# config/puma.rb

if ENV.fetch("RAILS_ENV", nil) == "production"
  environment ENV.fetch("RAILS_ENV") { "production" }
  directory '/var/www/apps/masterlist/current'

  # Set up socket and pid files
  bind "unix:///var/www/apps/masterlist/tmp/sockets/puma.sock"
  pidfile "/var/www/apps/masterlist/tmp/pids/puma.pid"
  state_path "/var/www/apps/masterlist/tmp/pids/puma.state"

  # Logging
  stdout_redirect "/var/www/apps/masterlist/logs/puma.stdout.log",
                  "/var/www/apps/masterlist/logs/puma.stderr.log",
                  true

  # Preload app for better performance
  preload_app!

  # Handle worker boot
  on_worker_boot do
    ActiveRecord::Base.establish_connection if defined?(ActiveRecord)
  end

  # Allow puma to be restarted by `rails restart` command
  plugin :tmp_restart

  # Workers (processes)
  workers ENV.fetch("WEB_CONCURRENCY") { 2 }
end

# Threading configuration
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count
```

### Directory structure on your production server

Our application will live in `/var/www/apps/`. The `/var` directory contains things that will be changed over the time, such as log-files, web-sites, databases. It's a good place for web applications as well.

The directory structure for Ruby on Rails application deployment looks like this:

```
.
└── apps
    └── masterlist
        ├── current -> var/www/apps/masterlist/releases/2024-11-22-13-30
        ├── logs
        ├── releases
        │   ├── 2024-11-21-07-45
        │   ├── 2024-11-21-09-11
        │   └── 2024-11-22-13-30
        ├── shared
        │   └── storage
        └── tmp
            ├── pids
            └── sockets
```

- **current** - This is a symbolic link to your latest deployment version of your application, in this case `current` points to `releases/2024-11-22-13-30` directory.
- **logs** - Puma will write two log files, accesses and errors, and both files are in this directory
- **releases** - This directory contains all deployed versions of your application, everytime you want to deploy a new version of you application, just create a directory and copy all files from your local development environment to here
- **shared** - All files that will not change between deployments are stored here, the database of your application is placed here so it won't be erased in every deployment
- **tmp** - Temporary files, there are files related to the Puma processes, and cache files

The `releases/`-directory is the core of the deployment process. Each deployment gets own directory and the `current/`-directory contains the files of newest deployment because it is always symlinked to the latest directory in `releases/`.

### First deployment

Let's do everything manually for the first deployment. Once everything is working, then sprinkle some automation via bash script.

Create all the required directories mentioned earlier. In this example, the application is called `masterlist`, change it to match your own application. Also make sure that the directories are owned by the `deploy`-user account.

```bash
$ cd /var/www
$ sudo mkdir -p apps/masterlist
$ sudo mkdir -p apps/masterlist/logs
$ sudo mkdir -p apps/masterlist/tmp/pids
$ sudo mkdir -p apps/masterlist/tmp/sockets
$ sudo mkdir -p apps/masterlist/tmp/shared/storage
$ sudo mkdir -p apps/masterlist/releases
$ sudo chown -R deploy:deploy masterlist # make sure the `deploy`-user owns the directories
```

#### Timestamping the deployment (a.k.a. release) and copying files for local development environment

There is a unix command called `date` which we can use to generate the timestamp of current time.

```
$ date +"%Y-%m-%d-%H-%M-%S"
2024-11-22-14-44-59
```

The format is `year-month-day-hours-minutes-seconds` and it gives your pretty good guarantee that each deployment will have an unique directory.

With the new timestamp, let's create a directory inside the `releases/`-directory.

```bash
$ cd /var/www/apps/masterlist
$ mkdir releases/2024-11-22-14-44-59
```

Copy the files from local development environment to production server. Use `scp` which is a part of SSH toolkit. In your local development environment, switch to the directory of the application and run following command.

```bash
# this following command MUST be run on your local development environment (a.k.a. your own computer)
$ scp -R * deploy@example.com:/var/www/apps/masterlist/releases/2024-11-22-14-44-59
```

Now we can create the symbolic link (a.k.a. symlink). This will be run on the production server.

```bash
# make sure you are in /var/www/apps/masterlist directory
$ ln -sf releases/2024-11-22-14-44-59 current
```

Everything is ready for Puma to run your Ruby on Rails application from `current/`-directory and store the database in `shared/storage`.

You can test that everything works by running `rails console` in `current/`-directory. In production server, your application will run in production-mode, therefore we have to use `RAILS_ENV=production` everytime we run any rails commands.

```bash
$ cd current
$ RAILS_ENV=production bin/rails console
```

But before that, we need to setup the ruby on rails application.

### Setting up the application

Create the database by running the database migrations. Make sure you are running the migrations in production mode by prefixing the command with `RAILS_ENV=production`.

```bash
$ cd /var/www/apps/masterlist/current
$ RAILS_ENV=production bin/rails db:migrate
```

Then you have to compile all assets so they become static assets, to be served by Nginx.

```bash
$ RAILS_ENV=production bin/rails assets:precompile
```
Again, make sure you're in production environment by writing `RAILS_ENV=production` before `bin/rails assets:precompile`.

## Test run with Puma

Finally it's time to start the Ruby on Rails application and that's the job for Puma. To test that everything works, first let's start our application manually.

```bash
$ cd /var/www/apps/masterlist/current
$ RAILS_ENV=production bundle exec puma -C config
/puma.rb
```

The output should look something like this:
```
[191034] Puma starting in cluster mode...
[191034] * Puma version: 6.4.3 (ruby 3.3.3-p89) ("The Eagle of Durango")
[191034] *  Min threads: 5
[191034] *  Max threads: 5
[191034] *  Environment: production
[191034] *   Master PID: 191034
[191034] *      Workers: 2
[191034] *     Restarts: (✔) hot (✖) phased
[191034] * Preloading application
[191034] * Listening on unix:///var/www/apps/masterlist/tmp/sockets/puma.sock
[191034] Use Ctrl-C to stop
```

The line `Listening on unix:///var/www/apps/masterlist/tmp/sockets/puma.sock` means that now Nginx and Puma have a way for communicating with each other.



### Unix process management with Systemd

## Storing data into SQLite3 database

## Serving static assets

## Automating the deployment
