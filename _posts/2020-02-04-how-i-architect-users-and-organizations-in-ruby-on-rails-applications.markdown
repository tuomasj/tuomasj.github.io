---
title: How I architect users and organisations in Ruby on Rails applications
layout: post
tags: programming
---

This is a blog post goes through some of the best practices that I have found out over the years when I have been building SaaS'ish web applications.

I use [Devise](https://github.com/heartcombo/devise) as my authentication library. I consider it the de facto authentication solution, at least until Ruby on Rails introduces an authentication solution that is built into Ruby on Rails.

I have been thinking about this subject for months, but this tweet by [Ben Orenstein](https://www.twitter.com/r00k) was the final push to get me into writing mode.

> "Has anyone written something great about how to model your Rails-based SaaS app with Users, Teams, Organizations, and Subscriptions so that you don't regret it later?"

[A link to the original tweet](https://twitter.com/r00k/status/1223450246992334850)

## Users and Organizations

The `Organization` is a model that is at the core of everything. Every `User` will be a member of an organization through an association called `Membership`.

![ER Diagram](/images/ruby-on-rails-application-er-diagram.png
#center)

When a user is created by Devise, it creates an organization and  membership and associates all of these three together.

The day will come when you need to associate your users in organizations and it will be the refactor from your worst nightmares. You will be better off by just associating organizations and users from the beginnings of your project.

## Base Controllers

I like to use two different controllers for guest users and logged in users, `ApplicationController` is used for users who are not signed in and `SignedInApplicationController` is used when I want to restrict the controller only for users who are currently signed in.

ApplicationController is as plain as possible.

    # app/controller/application_controller.rb

    class ApplicationController < ActionController::Base

      protected
        def after_sign_in_path_for(user)
          designs_path(user)
        end
    end

`SignedInApplicationController` has a larger set of responsibilities. It exposes two helper-methods, `current_user` is a Devise method and `current_organization` is defined here. It also forces to use a specific layout for signed-in users.


    # app/controller/signed_in_application_controller.rb

    class SignedInApplicationController < ActionController::Base
      before_action :authenticate_user!
      layout "signed_in_application"
      helper_method :current_organization
      helper_method :current_user

      protected

        def current_organization
          @current_organization ||= current_user.organization
        end
    end

## Namespacing models and controllers

I like to put models and controllers into namespaces when if they share similar responsibilities. Authentication and accounts prime candidates for namespacing and putting the files into subfolders.

As I mentioned, I am using Devise as go-to my authentication library. It works perfectly and does everything I need. I just override the create-method in registration controller, because I want to create `Organization` and `Membership` at the same time when `User` is created.

**Directory structure**

    controllers
      app/controllers/authentication/registrations_controller.rb

    models
      app/models/accounts/user.rb
      app/models/accounts/organization.rb
      app/models/accounts/membership.rb

The connection between `User` and `Organization` uses a conditional scope that returns only active memberships. This is a safety mechanism  built into `has_many` association method `organizations` to allow access only if membership is active.

    # app/models/accounts/user.rb

    class Accounts::User < ApplicationRecord
      devise :database_authenticatable, :registerable, :recoverable,
             :rememberable, :validatable, :confirmable, :trackable

      has_many :memberships
      has_many :organizations, -> {where(accounts_memberships: { status: 0})}, through: :memberships
      has_many :all_organizations, through: :memberships, source: :organization

      def organization
        # for now, just assume that user has membership with
        # only one organization
        organizations.first
      end
    end


## Creating an organization when user-record is created

There are a couple of ways to achieve this. I like to create the organization-model in the registrations controller.

The code here below is copied from my latest project. If you want to use this, please do not copy it from here. Instead, go to [Devise repository](https://github.com/heartcombo/devise) , find the `registrations_controller.rb` file and copy it from there. The `create_user_organization_and_membership` method does not necessarily need to be in the controller. You can put it into a separate file and make it as a model or a service object, whatever feels right for you.

    # app/controllers/authentication/registrations_controller.rb

    class Authentication::RegistrationsController < Devise::RegistrationsController
      def create
        build_resource(sign_up_params)

        # here is where the user-model is created
        create_user_organization_and_membership(resource)

        yield resource if block_given?
        if resource.persisted?
          if resource.active_for_authentication?
            set_flash_message! :notice, :signed_up
            sign_up(resource_name, resource)
            respond_with resource, location: after_sign_up_path_for(resource)
          else
            set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
            expire_data_after_sign_in!
            respond_with resource, location: after_inactive_sign_up_path_for(resource)
          end
         else
           clean_up_passwords resource
           set_minimum_password_length
           respond_with resource
         end
       end

       protected
         def after_inactive_sign_up_path_for(user)
           pending_confirmation_path
         end

         def create_user_organization_and_membership(user)
           return false unless user.valid?
           ActiveRecord::Base.transaction do
             user.save
             organization = Accounts::Organization.create(status: "active", name: user.email, created_by: user.email)
             membership = Accounts::Membership.create(organization: organization, user: user, role: "owner")
           end
           user
         rescue ActiveRecord::RecordInvalid => e
           # would be good idea to log the error message
           user
         end
    end

## What about payments and subscriptions?

When thinking about responsibilities in this architecture, the responsibility of holding the information if somebody has paid or not belongs to `Organization`.

The `Subscribeable` concern has the logic to determine if an organization has a payment subscription or not. It also has the functionality to start and end a subscription.

In my case, it contains free-trial functionality and requires a subscription after the free trial ends. Requiring the credit card in the registration process is a bit tricky in the EU with strong-customer-authentication (SCA) regulation.

I like to put payments into their own namespace. All related code lives in `payments` namespace. Payment processor related code lives in their own directories, for example `app/models/payments/processors/stripe_processor.rb`

![ER Diagram](/images/ruby-on-rails-application-er-diagram-with-payments.png#center)

`Organization`-class includes `Subscribeable` concern.

    # app/models/accounts/organization.rb

    class Accounts::Organization < ApplicationRecord
      include Payments::Subscribeable

      ...
    end

## Closing words

When creating something larger than "Hello World", things get complicated quickly. The term  "it depends" is used more and more. Any blog post written about software architecture can be read with a grain of salt. So pleas remember, this is just one way of architecting a SaaS user management.

If this approach feels a bit too limited for you, head over to FireHydrant blog and read [this blog post](https://www.firehydrant.io/blog/how-firehydrant-creates-data-in-rails/) by Bobby Tables.

**I would greatly appreciate it if you kindly give me some feedback on blog post!**

If you have ideas on how to handle the generic-part of the architecture of a SaaS, please send me an email or tweet at me. I'm always looking   to improve my skills and knowledge!

Any kind of feedback is appreciated! My email is ![my first name at my first name dot io](/images/tuomas-email.png#inline)
