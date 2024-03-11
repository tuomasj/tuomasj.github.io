---
layout: post
title: Frequently Asked Questions about Internet Domain Names and Websites
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

There are lots of domain registrars where to buy a internet domain, and their quality of service can be anything. I've owned domains over 20 years, and here are few my personal guidelines that I *try* to follow:

- **Use several registrants** - A cheap way to diversify the risk. If one of your registrants have problems, you still have other domains that you can operate.
- **Hide your personal details** - Pick a registrant that will hide your personal information from the DNS records. Never use your own personal email in the records, use a technical email such as `domains@example.com`.
- **Registrant in same country** - Try to pick a domain registrant that is located in same country as you, it makes things easier if you encounter any problems. Also, speaking a same language with your domain registrant is very helpful too.

The domain registrants that I have found to be good:

- [Shellit.org](https://shellit.org) - Located in Finland, speaks Finnish, so it's a great match for people living in Finland
- [DNSimple](https://dnsimple.com) - When the started, their target audience were programmers. Now they are bigger so their target audience is more generic. They are a bit more expensive than others.
- [Namecheap](https://www.namecheap.com) - This is a big player, and they have a good tool for generating domain names, and the tool is free to use.

There are so many domain registrants all over the internet. Try "domain registrant" as keywords on your favourite search engine and add your city or country at the end of keywords. I would search for `"domain registrant oulu"` or `"domain registrant finland"` since I live in Oulu, Finland.

Remember, when you buy a domain you also have to renew it each year. If the domain is important to you, make sure that you have automatic renewal turned on and the payment goes through every year.

**If you fail to pay for the domain at the end of billing cycle, you will lose it.** 

If you don't need the domain anymore, you can resell it or just let it expire.

## What is a good domain name?

A good domain name is what your visitors remember even in their sleep. But the domain name itself is not the important part. Your website must provide enough value to your visitors, that they will type the domain on a mobile phone in the middle of Finnish winter, at -25°C. 

When you are researching for possible domain names, and you find a domain name that has `.com` , `.fi` and `.net` available, don't hesitate for a second. Grab all three domain names. The most important TLD is `.com`.

Since there are over 390 million domain names, most likely your preferred domain is taken. If that is the case, then you have to get creative. Add a prefix or a postfix, or something. Back in the day, I came up with `tinyinvoice.com` since `invoice.com` was taken.

Don't get too creative. A good way to test if a domain name is good, is to explain it to your friends or family. Think about the difference between `masterlist.fi` and `masterli.st`, which one is easier to explain? Test the waters before buying it. 

## DNS is the system that runs Internet

The Domain Name System is the system that runs the modern world.  It's the global phone book. If your computer or mobile device has a Internet connection, it can connect to DNS. It's a distributed system that has "nodes" all over the world. 

The nodes are connected to root servers. There are 13 DNS root servers that are the authoritative source of trust for domain names. 

When you buy a domain name, the domain registrant is responsible to inform the DNS about a new domain name. When you make any changes to DNS records of your domain (for example, changing a `CNAME`), it takes few moments for the information spread around all the nodes in the DNS. Sometimes it may even take 24 hours until the changes are propagated all over the world.

Most domain registrars and DNS services have a time-to-live (TTL) component for a DNS record. This number means that how many seconds the record is cached before the information is refreshed. If your TTL is set to 300, it means that any change you make to your domain DNS-records takes about 5 minutes (300 seconds / 60seconds) until the change take effect all over the DNS nodes on Internet.

If you know you are about to make big changes to your DNS records (changing email provider or web hosting service), you have to change the time-to-live to small number (i.e. `60` seconds) at least 24 hours before you start making the change.

When you're happy with your DNS-records and you're done changing them, it's good practice to set TTL to a higher number. For most cases, 24 hours is big enough number, `86400` in seconds.

## Getting a website online

Ok, got the domain. It's a great domain! What next?

What you are looking for is a **website hosting** service. And like domain registrants, there are thousands and thousands website hosting services. There are global companies and there are local companies. They all offer the same service, connect a domain name with a website by editing `A`- or `CNAME`-records on the registrars website. They are part of your domain's DNS records and you have to edit the DNS records, otherwise your website does not work.

There are tools that you can use to check the DNS records. I use [WhatsMyDNS](https://www.whatsmydns.net/) to check that my `A`, `MX`, or `CNAME` records are set correctly for my domains.

Start small. Get bigger if you have the traffic. If you have 100 visitors per week, you don't need the beefiest service. Hundred visitors per week is such a low number that any kind of web hosting service can handle that easily. 

There are services that combine a web design tool and a hosting service. They have their limits but it will get you started.

Website design & hosting services:

- [Carrd](https://carrd.co/)
- [Mmm.page](https://mmm.page/)

When you have a HTML+CSS files ready to go, then you are looking for a **static website hosting**:

- [GitHub Pages](https://pages.github.com/) - Host a static site for free (your website source code is available for everyone),  your website is out there anyway, so it's not a big problem. 
- [Surge](https://surge.sh/) - Another static site hosting
- [Netlify](https://netlify.com) - Netlify is a static website hosting company that offers their own services to build dynamic components.

Buy your domain and website hosting from two different companies. Keep them separate and you have more flexibility.

If possible, make sure that your website has a function or a meaning. It might be a newsletter sign-up form, or buying a SaaS subscription. It can be anything. 

Most cases it's selling or marketing, that's how you grow your business. 

If your website has a function, it usually means that the website has a call to action (CTA) that you hope your website visitors perform.

Notice how I did not mention [WordPress](https://www.wordpress.com/), [SquareSpace](https://www.squarespace.com) or [Webflow](https://www.webflow.com). They are very good tools in some cases, but not when you're building the first version of the website. Speed is the key, launch fast.

## Sending and receiving emails on an internet domain

Next step is to send and receive emails on your internet domain. Your domain has `MX`-records, (mail exchanger records) that will the tell email service where to deliver the emails. When you buy a domain, you can edit the DNS records (MX-record too!) of your domain via the registrars service.

- [FastMail](https://www.fastmail.com/) - FastMail allows you to have one mailbox and multiple email domains and aliases. 
- [ProtonMail](https://www.protonmail.com/) - Allows one mailbox and one custom email domain
- [PurelyMail](https://www.purelymail.com/) - Really cheap, they offer only email
- [MailBox.org](https://mailbox.org/en/) - German, Secure, multiple aliases

Remember, your email is the number one threat vector for cyber criminals. **Use long passwords, and use two-factor authentication for extra security.** 

Also, do not write your email address as plain text on a webpage. The email spammers have automatic email address scrapers that will grab your plain text email from your website into the spammer's email list. It's a sure way to be on the receiving end of a spam email. Use a contact form or write your email address on a image and put that on the website if you want to share your email address.

## Final words 

**Step one:**
Start. Just start. Don't overthink it. Buy a domain. Build a website.

**Step two:**
Acquire visitors to your website.

