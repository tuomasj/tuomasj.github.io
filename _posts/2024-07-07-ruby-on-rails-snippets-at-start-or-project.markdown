---
title: Ruby on Rails Snippets I Find Helpful at the Start of a Project
layout: post
description: When I'm starting a new Ruby on Rails project, these are few snippets that I find helpful
---
## How to use custom fonts and host them from assets directory

First, introduce a new folder called `fonts` into assets. You also need to create the folder.

```
# config/application.rb
config.assets.paths << Rails.root.join("app", "assets", "fonts")
```

Then, setup a folder structure with the font assets your want to use. Put the file that contains all `@font-face` declarations into `app/assets/stylesheets`.

I'm using [Inter](https://rsms.me/inter/) and it has a CSS file with all font-faces. I've moved the CSS file into `app/asserts/stylesheets/vendor`, I like my stylesheets neat and structured.

Here is the folder structure:

```
# app/assets/

.
├── builds/
├── config/
├── fonts/
│   └── Inter-3.19
│       ├── Inter-Black.woff
│       ├── Inter-Black.woff2
│       ├── ...
│       ├── ...
│       └── Inter.var.woff2
├── images/
└── stylesheets/
    ├── application.sass.scss
    └── vendor
        └── inter-3.19.scss
```

Make sure the `@font-face` declarations point into correct folder.

For my needs, I need to add `Inter-3.19` into each font-face url since it's located in subfolder in `fonts`-folder.

Find and replace all occurences of
`src: url("Inter-roman.var.woff2?v=3.19") format("woff2");`
with
`src: url("Inter-3.19/Inter-roman.var.woff2?v=3.19") format("woff2");`

Finally, import the fonts in your CSS. Add the following into your root CSS file.

```
@use 'vendor/Inter-3.19';
```

## Setup rotating logs in production

Prevent your log files growing too big and filling up your server storage.

```
# config/environments/production.rb
config.logger = Logger.new(config.paths["log"].first, "weekly")
```

## Install language server for Ruby and Ruby on Rails

```
bundle add ruby-lsp-rails
```

Your editor should pick it up automatically, at least Sublime Text does it.

## Email configuration for development environment

I'm using [Mailcatcher](httpw://mailcatcher.me) to do my email styling in development mode.

First, install `mailcatcher` gem.

```
gem install mailcatcher
```

Setup the mail configuration in development.

```
# config/environments/development.rb

config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = { address: "127.0.0.1", port: 1025 }
config.action_mailer.raise_delivery_errors = false
```

Add mailcatcher in your development Procfile. There are similar gems out there, but mailcatcher fits me needs perfectly. 👌

```
# Procfile.dev
mail: mailcatcher --foreground
```

The `--foreground` switch keeps it running in same process and does not daemonize it into background. This way `Foreman` is able to stop `mailcatcher` process along with other processed defined in `Procfile.dev`.

## Closing thoughts

This blog post is written entirely for me. This saves me from searching the answers from  internet everytime I start a new project.

Some of thos snippets are very simple, but I cannot seem to memorize them into my brain. I still have to search bunch of simple stuff when programming. For example, the class that I need to inherit from when writing a unit test, I just don't remember it.

By the way, it's `ActiveSupport::TestCase`.
