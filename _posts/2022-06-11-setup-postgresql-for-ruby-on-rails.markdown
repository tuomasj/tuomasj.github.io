---
title: Setup PostgreSQL for your local Ruby on Rails development environment
tags: postgresql, postgres, ruby on rails
layout: post
---

<div style="background-color: #aaea75; padding: 1rem; border-radius: 0.2rem;margin-bottom: 2rem;">👋 This blog post is outdated, please navigate to <a href="/2023/08/19/updated-setup-for-postgresql-for-ruby-on-rails">the newer version</a>.
</div>

This short guide will install PostgreSQL database on your local Ruby on Rails development environment.

The database will be placed in `vendor/postgres*` folder depending on your PostgreSQL version.

## Create the database

Find out your local PostgreSQL version

    $ postgres --version
    postgres (PostgreSQL) 14.2

Create local database for Postgres

    $ pg_ctl init -D vendor/postgresql<version>

## Setup database superuser

Start PostgreSQL on another terminal. You have to have PostgreSQL running in order to perform the following steps.

```
$ postgres -D vendor/postgresql14.2/
2022-06-11 09:10:20.723 EEST [43595] LOG:  starting PostgreSQL 14.2 on aarch64-apple-darwin21.3.0, compiled by Apple clang version 13.0.0 (clang-1300.0.29.30), 64-bit
2022-06-11 09:10:20.725 EEST [43595] LOG:  listening on IPv6 address "::1", port 5432
2022-06-11 09:10:20.725 EEST [43595] LOG:  listening on IPv4 address "127.0.0.1", port 5432
...
...
```

Log in to PostgreSQL

    $ psql -p 5432 -h localhost -d postgres

Create Superuser in Postgres

    $ CREATE USER postgres SUPERUSER;
    $ \quit

## Setup databaser user for your project

Create portal user for local development and use password `password12`.

    $ createuser localdev -d -P -s

## Setup database configuration on Ruby on Rails

Depending on your PostgreSQL access control configuration, you might need to username and password configuration to your `config/database.yml` file.

```
# config/database.yml

...
...

development:
  ...

  # Add these two lines
  username: localdev
  password: password12
  ...

test:
  ...

  # Add these two lines
  username: localdev
  password: password12
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
