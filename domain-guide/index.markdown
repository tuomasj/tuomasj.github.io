---
layout: post
title: "Frequently Asked Questions about Internet Domain Names and Websites"
---

I regularly find myself in conversations where people ask me questions about internet domain names and websites. Where to buy them? Are they actually useful? How do I get a website running on a domain? 

It's sounds like a perfect opportunity to write a FAQ for people who are new to internet domains! 

Please note that Internet is in constant change. This blog post was written in early March in 2024. So if you're reading this in 2043, some details most likely are completely wrong.

## What is Internet Domain Name? 

Each computer connected to Internet (a.k.a. a server) has a IP-address. It's like a phone number. Your server has to have one, otherwise other computers cannot connect to it. Google and Facebook servers have IP-addresses. An IP-address is four numbers between 0-255, such as `130.231.240.1` which is the IP-address of University of Oulu, [the birthplace of IRC](https://en.wikipedia.org/wiki/IRC#History).

Internet domain name is a human-friendly name for the IP-address. It's easier to remember Oulu.fi than `130.231.240.1`. So when you type www.jomppanen.com in the address bar, the browser will ask from the DNS (Domain Name System) what's the IP-address for that address. The DNS replies with IP-address, and the browser opens a connection to the web server and you will see a website. 

The DNS records contains over 359.8 million domain names (Dec 2023). That is a lot of domain names!

## Why should a company own an internet domain?

A business needs a website. A business needs a brand. The internet domain name is a core building block for your brand. It is non-negotiable, you need it. 

If you are building a business, you also need an email address. Don't use `@gmail` or `@hotmail.com` emails. It's bad for your professional credibility if you run your business as `waynethehockeywizard99@gmail.com`. 

## What are TLD's a.k.a. top-level domains?

When Internet was invented [back in the day](https://en.wikipedia.org/wiki/History_of_the_Internet), there were only handful of top-level domains (TLD's), such as `.com`, `.org`, `.edu`, `.mil`. Since then, there are hundreds of TLD's with different kind of requirements. Pretty much all countries in the world have their own TLD, such as `.fi` and `.ai`, they are called ccTLD (country code TLD).

Some countries strike a gold mine with their TLD. Antigua from the Caribbean got $30 million dollar revenue in 2023 (reportedly!) from their country code TLD called `.ai`. 

Like I said, there are hundreds of TLD's to choose from. But even in 2024, the best TLD (a.k.a. the part after last comma) is still `.com`, try to get it and if it taken, go with other TLD's.

## Where to buy a domain?

There are lots of domain registrars, and their quality of service can be anything. I've owned domains over 20 years, and here are few my personal guidelines that I *try* to follow:

- **Use several registrants** - A cheap way to diversify the risk. If one of your registrants have problems, you still have other domains that you can operate.
- **Hide your personal details** - Pick a registrant that will hide your personal information from the DNS records. Never use your own personal email in the records, use a technical email such as `domains@example.com`.
- **Registrant in same country** - Try to pick a domain registrant that is located in same country as you, it makes things easier if you encounter any problems. Also, speaking a same language with your domain registrant is very helpful too.

The domain registrants that I have found to be good:

- [Shellit.org](https://shellit.org) - Located in Finland, speaks Finnish, so it's a great match for people living in Finland
- [DNSimple](https://dnsimple.com) - When the started, their target audience were programmers. Now they are bigger so their target audience is more generic. They are a bit more expensive than others.
- [Namecheap](https://www.namecheap.com) - This is a big player, and they have a good tool for generating domain names, and the tool is free to use.

There are so many domain registrants all over the internet. Try "domain registrant" as keywords on your favourite search engine and add your city or country at the end of keywords. I would search for `"domain registrant oulu"` or `"domain registrant finland"` since I live in Oulu, Finland.

## Getting a website online

Ok, got the domain. It's a great domain! What next?

What you are looking for is a **website hosting** service. And like domain registrants, there are thousands and thousands website hosting services. There are global companies and there are local companies. They all offer the same service, connect a domain name with a website by editing A- or CNAME-records on the registrars website. They are part of your domain's DNS records and you have to edit the DNS records, otherwise your website does not work.

Start small. Get bigger if you have the traffic. If you have 100 visitors per week, you don't need the beefiest service. Hundred visitors per week is such a low number that any kind of web hosting service can handle that easily. 

There are services that combine a web design tool and a hosting service. They have their limits but it will get you started.

Website design & hosting services:

- [Carrd](https://carrd.co/)
- [Mmm.page](https://mmm.page/)

When you have a HTML+CSS and you are looking for a **static website hosting**:

- [GitHub Pages](https://pages.github.com/) - Host a static site for free (your website source code is available for everyone),  your website is out there anyway, so it's not a big problem. 
- [Surge](https://surge.sh/) - Another static site hosting

When you buy domain registrant from different service than your website hosting, switching your website hosting service is very easy. 

Buy your domain and website hosting from two different company. Keep them separate and you have more flexibility.

If possible, make sure that your website has a function or a meaning. It might be a newsletter sign-up form, or buying a SaaS subscription. It can be anything. 

Most cases it's selling or marketing, that's how you grow your business. 

If your website has a function, it usually means that the website has a call to action (CTA) that you hope your website visitors perform.

Notice how I did not mention WordPress, SquareSpace or Webflow. They are very good tools in some cases, but not when you're building the first version of the website. Speed is the key, launch fast.

## Sending and receiving emails on an internet domain

Next step is to send and receive emails on your internet domain. Your domain has MX-records, (mail exchanger records) that will the tell email service where to deliver the emails. When you buy a domain, you can edit the DNS records (MX-record too!) of your domain via the registrars service.

- [FastMail](https://www.fastmail.com/) - FastMail allows you to have one mailbox and multiple email domains and aliases. 
- [ProtonMail](https://www.protonmail.com/) - Allows one mailbox and one custom email domain
- [PurelyMail](https://www.purelymail.com/) - Really cheap, they offer email
- [MailBox.org](https://mailbox.org/en/) - German, Secure, multiple aliases

Remember, your email is the number one threat vector for cyber criminals. **Use long passwords, and use two-factor authentication for extra security.** 

Also, do not write your email address as plain text on a webpage. The email spammers have automatic email address scrapers that will grab your plain text email from your website into the spammer email list. It's a sure way to be on the receiving end of a spam email. Use a contact form or write your email address on a image and put that on the website.

## How do I know much visits my website gets?

Website Analytics or Web Analytics is the software you need. It means that you put a piece of code on every page on your website. Every time someone visits your website, that piece of code will ping back to the web analytics server and record a visit into a database. 

Many web analytics tools will also store an unique identifier in your browser. That unique identifier is used to track visitors across the internet. For example, Google Analytics is using that unique identifier to track people when they visit different websites across Internet. 

The more web analytics data is collected, it increases the accuracy of personalisation on ads that are displayed to you.

European Union has "cookie" regulation that tried to set limits on the data which is being collected on Internet users, but instead of collecting less data, website analytics tools started to ask permission to continue collect all the data they can. That's why websites in Europe have that annoying cookie banner.

But luckily you don't have to annoy your users with cookie banner if you use privacy-friendly web analytics. 

Please use privacy friendly web analytics tool.

Here are few web analytics tools that are privacy friendly: 

- [Plausible](https://www.plausible.io)
- [SimpleAnalytics](https://www.simpleanalytics.com)

I'm using self-hosted version on Plausible and I have been happy with it. It has all the features that I need.

## How do I get visitors for my website?

Short answer: by providing value for your target audience.

Long answer: Write great content, content that teaches something, content that makes people laugh, content that makes people think. Provide great value to the visitors. That is how you get visitors to your website.

Of course, "build and they will come" does not work. You have to get your website in front of your target audience, build the traffic. Go where your target audience is, learn the rules of the platform, and somehow let them know that you exist. Please don't spam, nobody likes spam. Be smart, be creative.

The website traffic (of the visitors) can be categorised as paid, direct and organic:

**Paid traffic** means that you buy an ad, a person sees your ad, clicks the ad and get taken your website. This is how Google and Facebook make their money. They want users to spend as much time as possible on their network of websites, so they can show ads (which somebody else bought!). It's also the reason they collect so much information about everybody, so the people buying ads can target them very accurately, and increase the relevancy of the ad.

**Direct traffic** means that somebody typed `jomppanen.com` on their browser address bar and pressed enter. This is the best kind of traffic. It means the visitor has either bookmarked your website or they just remember the address.

**Organic traffic** means that a person types keywords into search engine and sees your webpage listed on the search results. They click the result and they are redirected to your website. When you optimise your website content so that your target audience can find it via search engines, it is called **search engine optimisation** (SEO). 

Once you know what kind of traffic your website gets, then you can start thinking about **conversion rate**. What percentage of the website visitors perform the main call to action (CTA). 

For example, your SaaS home page gets 1000 visitors per week, and 14 of them start a new subscription (CTA). It means your website has 1.4% conversion rate. 

- How do you improve your website to get +10% in conversion rate?
- What do you need to do to increate visitors by +1000 per week?

See how marketing starts to look like simple math? You do an experiment and measure it -- if the experiment works, keep doing it. 

## Final words

Start. Just start. Build a website. Get a domain. It's going to be so much fun! 

