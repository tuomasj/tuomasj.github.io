---
title: Updated setup PostgreSQL for your local Ruby on Rails development environment
tags: postgresql, postgres, ruby on rails
layout: post
---

This short guide will install PostgreSQL database on your local Ruby on Rails development environment.

The database will be placed in `vendor/postgres*` folder depending on your PostgreSQL version.

## Create the database

Find out your local PostgreSQL version

    $ postgres --version
    postgres (PostgreSQL) 14.8

Create local database for Postgres

    $ pg_ctl init -D vendor/postgresql<version>

## Create the database inside your Ruby on Rails project

Start PostgreSQL on your terminal. After you have it running, open another terminal window and perform the other steps.

```
$ postgres -D vendor/postgresql14.2/
2023-08-19 18:09:38.097 EEST [22144] LOG:  starting PostgreSQL 14.8 (Homebrew) on aarch64-apple-darwin22.4.0, compiled by Apple clang version 14.0.3 (clang-1403.0.22.14.1), 64-bit
2023-08-19 18:09:38.099 EEST [22144] LOG:  listening on IPv6 address "::1", port 5432
2023-08-19 18:09:38.099 EEST [22144] LOG:  listening on IPv4 address "127.0.0.1", port 5432
2023-08-19 18:09:38.099 EEST [22144] LOG:  listening on Unix socket "/tmp/.s.PGSQL.5432"
2023-08-19 18:09:38.101 EEST [22145] LOG:  database system was shut down at 2023-08-19 18:09:35 EEST
2023-08-19 18:09:38.102 EEST [22144] LOG:  database system is ready to accept connections
...
...
```

## Setup database users for your project

Create a superuser for your database

    $ createuser postgres -s

Create an user for your local development and use password `password`.

    $ createuser localdev -d -P

## Setup database configuration on Ruby on Rails

Depending on your PostgreSQL access control configuration, you might need to set username and password configuration to your `config/database.yml` file.

```
# config/database.yml

...
...

development:
  ...

  # Add these two lines
  username: localdev
  password: password
  ...

test:
  ...

  # Add these two lines
  username: localdev
  password: password
  ...

```

## Create databases for development and test environments

Run Rails task to create the databases. If you see following output, databases for development and test environments were created successfully.

    $ rails db:create
    Created database '<rails_project_name>_development'
    Created database '<rails_project_name>_test'


## Add PostgreSQL to your Procfile.dev

Add the following line to `Procfile.dev`

```
# Procfile.dev

db: postgres -D vendor/postgresql<version>
```

## Configure Git to ignore the development databases

Add this following line to `.gitignore` and commit it to your repository. This way your database will not be commited to the git repository.

```
# .gitignore

/vendor/postgres*
```

## The Last Step

Finally, start your Rails development engine and you're good to go!

```
$ bin/dev
```
