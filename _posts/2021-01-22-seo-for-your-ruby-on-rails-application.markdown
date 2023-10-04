---
title: SEO for your Ruby on Rails application
tags: seo, marketing
layout: post
---
I’m building a side project (a micro SaaS!) that you can use to send simple questions to your friends/colleagues and the recipients can answer through email. To get some traffic, this blog post describes how I optimized my Micro-SaaS for search engines. A basic set of techniques that form a baseline search engine optimization for a site. It does not get you a massive amount of traffic, but without these optimization techniques, you get zero traffic from search engines.

__Terminology:__

- SEO means search engine optimization
- A web crawler is an automatic tool that crawls through the internet and analyses the content of every page that it can find, and stores that into a database, also known as indexing (i.e. Googlebot, Bingbot)
- A search engine is a web page/product that searches that indexed database using the keywords from the user (Google, Bing, Duckduckgo)

## SEO Analysis Tool

First, you need an SEO analysis tool. The internet is filled with online and offline tools that analyze your website from every possible aspect. Search engines are your friends, just search for “SEO Tool” and you will a lot of tools.

I’m using a browser extension called Detailed SEO Extension for simple SEO analysis. I don’t need a huge set of features, I just need the basic things and this extension does exactly that. You click a button and it gives you the current situation in an easily digestible version. Just head over to
<a href="https://detailed.com/extension/" target="_blank">Detailed SEO Extension</a> for the browser extension.

This is how it looks like when I analyze my Micro-SaaS landing page.

![](/images/detailed_seo_extension.png)

## HTML Meta tags for SEO and Social

When the link to your page is shared in Facebook or Telegram, it shows the link preview/thumbnail. That information comes from OpenGraph tags or Twitter card tags. Luckily Twitter understands OpenGraph, so I'm not using Twitter cards.

The minimal opengraph / twitter card tags looks like this:

```
<meta property="og:title" content="Yesno.email - Ask simple questions via email from your friends and colleagues">
<meta property="og:description" content="Send simple yes/no questions with Yesno.email -- No more back and forth emails, send one email and get your question answered. When everybody has answered the question or the question expires, you will get a report with results and individual answers.">
<meta property="og:image" content="">
<meta property="og:url" content="https://www.yesno.email">
<meta name="twitter:card" content="summary_large_image">
```

## Description tag

When your site appears on the search engine results page, the description tag in the HTML head is what is shown to the user. This piece of text is very important since it plays a major significance if a user clicks the link and lands on your website. The description cannot be too short or too long, many SEO tools say 70-120 characters is the optimal length.

This is a very important line of HTML, give it some thought.

```
<meta name="description" content="Ask simple questions via email from your friends and colleagues and get them answered! Yesno.email">
```

## Canonical link

The canonical link tells the search engine the location of the original version. In this case, there are no other copies of the site or the content, the site-wide canonical link structure is very simple. Just set the canonical link to point to the same page.

Just put this line in your `application.html.erb` and your canonical links are in order.

```
<link rel="canonical" href="<%= url_for(only_path: false, protocol: :https) %>" />
```

## Header-tags

Just use one &lt;h1&gt; tag per page. It’s the main header of your page and search engines use headers when they are indexing the page.

After you are happy with &lt;h1&gt;, next step is to put kick ass &lt;h2&gt; in place.

## Robots.txt

Robots.txt is a file that provides information about your site to web crawlers. If you don’t want to index a certain part of your site, specify it in the file.

In yesno.email, there are a few routes that web crawlers have no business crawling. It has a path http://yesno.email/answers/* that is the route for an active question. When a user opens that route, the answer is registered for a question and the path goes inactive. This is the core functionality of yesno.email. If crawlers start hitting the route, it may potentially mess up an active question.

The disabled route in robots.txt is not enough protection. Yesno.email uses a gem called [browser](https://github.com/fnando/browser) to detect crawlers in controllers. This is the only way to block email clients who are prefetching links on an email.

My robots.txt also contains the full path to the sitemap file.

```
# robots.txt

User-agent: * Disallow: /answers/*
User-agent: * Disallow: /confirmations/*

Sitemap: https://www.yesno.email/sitemap.xml.gz
```

## Sitemap

Sitemaps are XML documents that describe the structure of your site for web crawlers. The larger your site is, the bigger benefit you will get from well-defined sitemap file. Sitemap file has useful information to web crawlers, i.e. the update frequency of a page. You can tell web crawlers to crawl a page every day or even every hour. Very useful if you have a page that changes multiple times per day.

You need line this in your `app/views/layouts/application.html.erb`

```
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml.gz" />
```

A gem called [sitemap_generator](https://github.com/kjvarga/sitemap_generator) makes things easier. It creates a sitemap file in `public/sitemap.xml.gz` that is built according the rules in `config/sitemap.rb`.

After you have installed the gem, you can refresh your sitemap and automatically ping the web crawlers to crawl your site.

```
$ rails sitemap:refresh

In '/Users/tuomas/Projects/src/yesno/public/':
+ sitemap.xml.gz                                           2 links /  342 Bytes
Sitemap stats: 2 links / 1 sitemaps / 0m00s

Pinging with URL 'https://www.yesno.email/sitemap.xml.gz':
  Successful ping of Google
  Successful ping of Bing
```

## Summary

Search engines and web crawlers improve constantly. In 2021, there are no dirty tricks or easy victories in SEO. The best way to get traffic from search engines is to write content that provides value to visitors. The foundation of the worldwide web still is the same, it’s the hyperlinks. It is the clearest signal for web crawlers and search engines. When a site links to another site, it is a vote of confidence and authority. The more links you have to your page, the better changes it has to end up on the search results page on certain keywords.

The SEO work I did for [yesno.email](https://yesno.email) takes a while to affect. The site is very small, and there is no extra content that the crawlers could index. Without any additional content, I don’t expect huge traffic through search engines.

Search engine optimization is important, but it’s still a tool in your toolbox. The better you know your target audience, the better results you get from SEO. What is the problem of your target audience? Do they use search engines when they are learning how to solve that problem? If they use search engines, what kind of keywords they use? If you know the answers to these questions, everything becomes a bit easier, even SEO. 😉

