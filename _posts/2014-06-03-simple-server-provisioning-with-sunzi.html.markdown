---
title: Simple Server Provisioning with Sunzi
description: Simple Server Provisioning with Sunzi
layout: post
tags: server provisioning, deployment
---

There is that one group of people, who have their own [little](http://tinybill.net) [hobby](http://gridlover.net) [projects](http://yourdream.io) that needs a server or two. One easy solution is to deploy the project into [Heroku](http://heroku.com) free plan. It's great, it does not cost you anything and you can quickly test if your project flies. If it does gain traction, just swipe your credit card and level up in Heroku. You practically convert money into more free time and less headaches.

## Server Provisioning

What if you application doesn't really work perfectly hosting services? What if you want to set up your own servers just because that is how you roll. You could do it manually, typing each command on console, or you could automate the process as much as possible. Just run one command and after it's complete, your server is ready to go. That is called server provisioning.

I've tried [Puppet](http://puppetlabs.com/) and [Chef](http://www.getchef.com/). They both are very powerful monsters. They definitely can do the job when you need server provisioning and thats why the big boys are using them. They also are too complex for my needs. They both are complex and it takes time to configure the setup. I like simple and fast.

## Sunzi

Sunzi is great because it's simple. It's written in Ruby and you can install it using Rubygems. It does not have custom configuration language. You do not have to learn a new way to configure your server. **Sunzi is based on shell scripts.** All your server provisioning is plain shell scripts. You write the scripts on your local machine, and Sunzi moves those scripts to the server and runs them on there.

When you install sunzi, it will create a file called ```install.sh```. It is the file which is run on your server. If you want, you could actually put all your commands into that file, but it's easier to use ```recipes/``` folder for specific tasks. It also creates ```sunzi.yml``` file where your common configuration settings are, like application name or username for database. You can check out the complete directory structure from [here](https://github.com/kenn/sunzi#directory-structure).

Like I said, it's just bunch of shell scripts that are transferred to the server. After all files are transferred, Sunzi runs the ```install.sh``` on your server.

## What next?

If you are happy with Heroku, I recommend that you keep using it. Setting up your own servers takes time, and it is not as simple as it sounds. I don't even want to calculate how many hours I have wasted just for learning server provisioning. But if you're stubborn and want to have more control with your server, Sunzi might be just the tool for you.

I am not going to explain how to use Sunzi because others have already done great job with that. Here are few links that will get on full speed with Sunzi.

- [Sunzi](https://github.com/kenn/sunzi) on Github
- [Deploy Rails 4.1 app with Sunzi and Capistrano 3](http://www.youtube.com/watch?v=3mwupXqtkmg) screencast

If Chef or Puppet are just too complex for your needs, try Sunzi.
