---
title: Testing Activation Emails with Capybara, RSpec and Custom Matcher
layout: post
description: I wrote a RSpec / Capybara custom matcher for testing the activation emails that are being sent when a new user registers to a web app.
tags: ruby on rails, rspec
---
I am writing a [small invoicing app](http://tinyinvoice.net) using Ruby on Rails. Like all web apps, it needs to confirm the email when new user signs up. If the email is misspelled and the user does not notice it when creating the account,
we leave the user in very confused state on the next sign in. That is bad UX and we don't want that.

I'm using RSpec with Capybara for my integration tests. I was TDD'ing happily and I got to the part where I test the account activation process. It's very basic, user fills in email and password, hits the register button and activation email is being sent with an activation link. User clicks the link and voilá, the user has been activated and is able to sign in.

In a scenario, I wanted to test that an activation link exists in the activation email.

**Here is my first try:**

```ruby
it "confirms the email when user clicks the confirmation link on activation email" do
  register_new_user("john.smith@example.com", "adobe password", "adobe password")
  activation_token = User.last.activation_code
  expect( open_last_email.body).to have_selector("a[href$='#{activation_token}']", count: 1)
  visit activation_path(activation_token)
  expect(page).to have_content( "Your email has been confirmed.")
end
```

It opens the last sent email and checks if there are any links that have a href-attribute which ends with the activation token.
I'm writing a app which is being localized into two languages, and locale is based on the domain.
I want to be sure that the activation code exists in the email. That is why I need to check all the links in the email,
and see if there is a link with href-attribute that ends with the activation code.

(note: I'm using [email-spec](https://github.com/bmabey/email-spec) gem for email helpers)

However, this spec is not very clear on the intention. If you know how to use css selectors work, then you know what this spec is doing.
I use them so rarely, that I probably forget what that selector means in couple of weeks.
I want to have much better spec. I want my specs to be descriptive.

**This looks better**

```ruby
it "confirms the email when user clicks the confirmation link on activation email" do
  register_new_user("john.smith@example.com", "adobe password", "adobe password")
  activation_token = User.last.activation_code
  expect( open_last_email.body).to have_link_with_endswith(activation_token)
  visit activation_path(activation_token)
  expect(page).to have_content( "Your email has been confirmed.")
end
```

This looks better. Now it's clear that email body needs to have a link with href-attribute that ends with the activation token.
To get that spec working, we need a custom matcher. It's easy to do when you look [matchers](https://github.com/jnicklas/capybara/blob/master/lib/capybara/rspec/matchers.rb) from Capybara source code and use it as an example for
building your own custom matcher for Capybara and RSpec.

This is the custom matcher. It's simple, it just hides the logic of testing the end of a href-attribute inside a matcher.

```ruby
# spec/features/support/have_link_endswith.rb
module Capybara
  module RSpecMatchers
    class HaveLinkEndswith < Matcher
      attr_reader :matching_value

      def initialize(*args)
        @matching_value = args.first
      end

      def matches?(actual)
        @actual = wrap(actual)
        @actual.has_selector?( :css, "a[href$='#{matching_value}']")
      end

      def does_not_match?(actual)
        @actual = wrap(actual)
        @actual.has_no_selector?( :css, "a[href$='#{matching_value}']")
      end

      def failure_message_for_should
        "expected there be a link which href ends with #{matching_value.inspect} in #{@actual.text}"
      end

      def failure_message_for_should_not
        "expected there not be a link which href ends with #{matching_value.inspect} in #{@actual.text}"
      end

      def description
        "link with href that ends with #{format(content)}"
      end
    end

    def have_link_that_endswith(*args)
      HaveLinkEndswith.new(*args)
    end
  end
end
```

I have also saved these files into a [Gist](https://gist.github.com/tuomasj/7584071) in Github.
