---
title: Oulu SaaS - Session 3
layout: plain_with_title_asciinema
---
# Oulu SaaS - Session 3


## Active Record ja Tietokannan indeksi

Luodaan `links`-niminen taulu jolla on `url` ja `token` attribuutit. Molemmilla attribuuteilla on `null: false` eli alla oleva tietokanta ei suostu luomaan uutta tietuetta mikäli `url` tai `token` ovat tyhjiä.

Tämä migraatio on luotu rails-komentorivityökalulla `rails generate migration create_links`. Huom, links-taulu tietokannassa vaatii `Link`-tietomallin `app/models`-kansiossa.

```ruby
class CreateLinks < ActiveRecord::Migration[7.1]
  def change
    create_table :links do |t|
      t.string :url, null: false
      t.string :token, null: false

      t.timestamps
    end
  end
end
```

Lisätään `links`-tauluun rajoite (UniqueConstraint) joka ei mahdollista kahta samanlaista `token`-attribuuttia tietokannassa. Tämä tehdään luomalla tietokantaan taulun `token`-attribuutille indeksi. Indeksit ovat eräänlaisia "hakemistoja", joiden avulla tehostetaan tietokannasta haettavaa tietoa. Tässä tapauksessa luodaan uniikki-indeksi attribuutille `token`, joka estää kahden samanlaisen `token`-arvon sisältämän tietueen tallettamisen tietokantaan.

Migraatio on luotu rails-komentorivityökalulla `rails generate migration add_unique_index_to_to_link` joka luo tyhjän migraatio-tiedoston `db/migrations`-hakemistoon.

```ruby
class AddUniqueIndexToLink < ActiveRecord::Migration[7.1]
  def change
    add_index :links, :token, unique: true
  end
end
```

## Reitit ja Kontrollerit

Kontrolleri on se osa Ruby on Rails-applikaatiota, jonka sisälle ohjelmoindaan toiminnot halutuille osoitepoluille. Lisäksi kontrollerit hyvin useasti noudattavat RESTful-käytäntöjä, jolloin applikaation reitit noudattavat samaa kaavaa.

Rails-komentorivityökalulla `rails routes` voit listata käytössä olevat reitit kontrollereihin. Lisäksi voit tehdä hakuehtoja reiteille, esimerkiksi `rails routes -g Link` näyttää vain ne reitit, missä esiintyy sana "Link".

Esimerkki `routes.rb` tiedostosta, mitä käsiteltiin kolmannella tunnilla.

```ruby
# config/routes.rb

Rails.application.routes.draw do
  # use case: luodaan linkki
  # linkshort.com/links/new
  # get "/links/new" => "links#new"
  # get "/links" => "links#index"

  resources :links

  # Defines the root path route ("/")
  # root "posts#index"
end
```

Reitteihin voi määritellä jokaisen reitit käyttämällä HTTP verbejä [#1] (GET, POST, PATCH, PUT, DELETE). HTTP-standardin mukaisesti webselaimet käyttävät pääasiassa GET ja POST tyyppisiä HTTP-kutsuja, mutta muut kutsutyypit ovat käytössä.

Mikäli ei halua määritellä reittejä yksi kerrallaan, niin voi käyttää esimerkiksi `resources`-metodia, joka luo RESTful-käytännön mukaiset reitit resurssiin.

Alla oleva `LinksController` on vastinkappale `resources :links`-määrittelylle. Niitä kontrolleri-luokan metodeja kutsutaan "action":ksi (toiminnoksi), joille löytyy reitistöstä vastinpari.

```
$ rails routes -g link
   Prefix Verb   URI Pattern               Controller#Action
    links GET    /links(.:format)          links#index
          POST   /links(.:format)          links#create
 new_link GET    /links/new(.:format)      links#new
edit_link GET    /links/:id/edit(.:format) links#edit
     link GET    /links/:id(.:format)      links#show
          PATCH  /links/:id(.:format)      links#update
          PUT    /links/:id(.:format)      links#update
          DELETE /links/:id(.:format)      links#destroy
```

Oikeanpuoleisessa sarakkeessa listataan kontrolleri ja toiminto, esim `links#index` rivi viittaa `LinksController`-luokkaan ja `index`-metodiin. Jolloin koko rivin voi lukea niin että jos Ruby on Rails:in reititys saa HTTP GET-pyyntön polkuun `/links`, niin silloin kutsutaan `LinksController`-luokan `index`-metodia.

```ruby
# app/controllers/links_controller.rb

class LinksController < ApplicationController
  def index
    # tulostetaan sivulle pelkkä "INDEX"-teksti
    render plain: "INDEX"
  end

  def new
    # tulostetaan sivulle pelkkä "Hello, world"-teksti
    render plain: "Hello, world"
  end
end
```

- <a name="1">HTTP verbit Mozillan kehittäjädokumentaatiossa</a>: [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

