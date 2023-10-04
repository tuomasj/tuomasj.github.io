---
layout: post
title: Faster Prototyping with Ruby on Rails, Bourbon, Neat and Bitters
tags: prototyping, rails, bourbon, neat, bitters
---

In the [previous blog post](/prototyping-cost-for-web-application-is-approaching-zero.html), I showed how you can run your prototypes with only few dollars per month. Now I’m going to show you how to prototype fast.

[Bourbon](http://www.bourbon.io), [Neat](http://neat.bourbon.io) and [Bitters](http://bitters.bourbon.io) are open source projects by [Thoughtbot](http://ww.thoughtbot.com). They are [SASS](http://sass-lang.com) mixin libraries. It means they can write a lot of CSS for you. If you happen to lack web design skills (like me!), Bitters is a default stylesheet that makes your prototype look good.

For fast prototyping, my weapon of choice is Ruby on Rails. It’s a full-blown web framework, but I’m using a very limited set of features, to preprocess the SCSS and SASS files into CSS. There are other options for rapid prototyping in Ruby ecosystem as well, [Sinatra](http://www.sinatrarb.com), [Padrino](http://www.padrinorb.com) and [Middleman](http://www.middlemanapp.com).

## Grid layout and Directory Structure

First, let’s install Bourbon and Neat. Go ahead and read the installation instructions for both projects. Neat is a set of functions (they are called mixins) that help building a responsive grid for your prototype. To use Bourbon and other libraries, you need to use SCSS or SASS, normal CSS will not work.

Second, structure the files so you don’t get overwhelmed by the stylesheets. It helps to keep the stylesheets organised in small files. I keep my application.css.scss small. No styles, just import other files. For these examples, I'm using SCSS since it's looks almost like CSS, so everybody who knows CSS can understand these examples.

```sass
// application.css.sass

// import libraries & frameworks
@import "normalize"
@import "bourbon"
@import "base/base"
@import "neat"

// import application specific files
@import "partials/responsive"
@import "partials/layout"
```

## Start with Mobile First

Build your stylesheets for mobile first. Design the layout for mobile, and then add special rules for tablet and desktop layouts. Use [Neat breakpoints](http://thoughtbot.github.io/neat-docs/latest/#new-breakpoint) to create a small set of media query helpers that you can use in your stylesheet.

```sass
// partials/_responsive.sass

$mobile-width: 480px
$tablet-width: 760px

$tablet: new-breakpoint(min-width $mobile-width max-width $tablet-width)
$desktop: new-breakpoint(min-width $tablet-width)
```

This creates two helpers called $tablet and $mobile. Let’s test the breakpoints by changing the background color based on the width of the browser.

```sass
// partials/_layout.sass
body
  background-color: white

  @include media($tablet)
    background-color: light-gray

  @include media($desktop)
    background-color: gray
```

## Bring forth the Responsive Grid

Neat is a simple grid framework. It’s only function is to help you build a grid system for you. By default, Neat has 12 column grid.

Let’s build a simple responsive grid. On mobile layout, it is a single column layout. For tablet and desktop, it is a two column layout.

The default layout is a single ```.grid-cell``` which is 12 columns wide in the grid system. After the tablet breakpoint, the width of ```.grid-cell``` is set to 6 columns. The grid system width is 12 columns, so now the browser can fit two ```.grid-cell```-elements in a one row. The same applies for desktop layout which is set to 6 columns as well.

This is an example of mobile first approach. The default styles are applied on all screen sizes, from narrowest width. Then the wider variations for the tablet and desktop are added on the top of mobile layout.

```scss
// partials/_layout.scss
.grid-row {
  @include outer-container;

  .grid-cell {
    @include span-columns(12);
    @include media($tablet) {
      @include span-columns(6);
    }

    @include media($desktop) {
      @include span-columns(6);
    }
  }

  .grid-single-cell {
    @include span-columns(12);
  }
}
```

As a bonus, there is also a ```.grid-single-cell``` that always spans across 12 columns, filling the row. This is useful for “hero” content, like logo or login form.

And last but not least, Bitters. Just throw it in your ```application.css.scss``` and your prototype starts to look clean and simple. It’s a simple default stylesheet that needs very little customising. Check out the Bitters [example page](http://bitters.bourbon.io/example.html). It looks so good, that it gives the impression that your prototype is an actual product. Then your prototype is ready to fulfil its purpose.

## What About The Other Frameworks?

There are other options as well, [Purecss](http://purecss.io), [Foundation](http://foundation.zurb.com/) or [Bootstrap](http://getbootstrap.com)? These are complete solutions. They have communities building themes and extensions, with a lot of documentation found all over the web. The only down-side that I can think of is that these frameworks expect you to build your stylesheets following the philosophy of the framework.

The idea behind Bourbon & Neat are different than CSS frameworks. By using SASS mixins, you create only those CSS rules that you need, and keep the stylesheets nice and tidy. On the other hand, CSS Frameworks have all the bells and whistles with many different grid systems. This naturally makes the stylesheet bigger in size.

In my opinion, both options are good, pick one that suits you better. It only matters if you get your prototype in front of people.
