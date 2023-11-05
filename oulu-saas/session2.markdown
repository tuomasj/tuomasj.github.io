---
title: Oulu SaaS - Session 2
layout: plain_with_title_asciinema
---
# Oulu SaaS - Session 2

Toisen session asiat videomuodossa, paina play! ▶️🙂

Videon voi pysäyttää painamalla `välilyöntiä`, `nuoli oikealle` tai `nuoli vasemmalle` hyppää 5sec eteenpäin/taaksepäin. Painamalla `f` suurenee video koko ruudun kokoiseksi.

<div id="cast1">
</div>

<small>Videon kesto 13min 41sek, powered by <a href="https://asciinema.org">Asciinema</a></small>


## Käsitellyt asiat Rails Guides-linkkeinä

- Perustietoa ActiveRecord:sta: [Ruby on Rails Guides - ActiveRecord basics](https://guides.rubyonrails.org/active_record_basics.html)
- Miten tehdään tietomallilla validaattoreita: [ActiveRecord Validations](https://guides.rubyonrails.org/active_record_validations.html)
- Miten kutsutaan metodia kun jokin tietto operaatio tapahtuu tietomallin sisällä: [ActiveRecord Callbacks](https://guides.rubyonrails.org/active_record_callbacks.html) (Käytettiin `presence` ja `uniqueness` validaattoreita)
- Tietokanta migraatiot: [ActiveRecord migrations](https://guides.rubyonrails.org/active_record_migrations.html)

## Konsolikomentoja

`rails new session2` komento millä Ruby on Rails luo meille projektin hakemistorakenteen ja asentaa Ruby on Rails:in tarvitsemat kirjastot (eli Gem:it)

`rails console -s` käynnistää Rails konsolin "hiekkalaatikko"-tilassa (`-s`), jolloin kaikki konsolissa tehdyt muutokset peruuntuvat kun poistutaan Rails konsolista. Komennon voi myös lyhentää `rails c -s`.

`rails generate model Link` luo luokan ja migraatiotiedoston tietomallille nimeltään Link.

`rails db:migrate` komennolla ajetaan migraatiotiedostot, mikäli niitä on ajamatta. Vastakohtana `rails db:rollback` jolla peruutetaan viimeisin migraatio.

`rails generate` listaa kaikki saatavilla olevat koodin generaattorit.

## Miten haetaan tietoa ActiveRecordin kautta?

- `Link.all` hakee aivan kaikki `Link`-tietueet
- `Link.first` ja `Link.last` hakee ensimmäisen tai viimeisen tietueen
- `Link.find_by(id: 2)` tai `Link.find_by(url: "example.org")` hakee yhden tietueen annetuilla ehdoilla. Lisäksi voi tykitellä useilla hakuehdoilla `Link.find_by(id: 0, url: "example.org")`
- `Link.where(id: 2)` palauttaa yhden tai useampia tuloksia taulukkomuodossa
- `Link.exists?(url: "example.org")` palauttaa true tai false, riippuen löytyykö annetuilla ehdoilla tietueita
- `Link.pluck(:url)` palauttaa annetun attribuutin arvot (tässä tapauksessa kaikki `url`-attribuutit), voi hakea useampia attribuutteja `Link.pluck(:url, :token)`

## Datan migraatio

```ruby
# db/migrate/20231103090514_create_links.rb

class CreateLinks < ActiveRecord::Migration[7.1]
  def change
    create_table :links do |t|
      t.string :url
      t.string :token
      t.timestamps
    end
  end
end
```

## Tietomallin luokka

```ruby
# app/models/link.rb

class Link < ApplicationRecord
  # https://guides.rubyonrails.org/active_record_validations.html#presence
  validates :url, presence: true
  validates :token, uniqueness: true

  # https://guides.rubyonrails.org/active_record_callbacks.html#after-initialize-and-after-find
  after_initialize :generate_unique_token

  def generate_unique_token
    self.token = loop do
      temp_token = SecureRandom.hex(4)
      if Link.exists?(token: temp_token) == false
        break temp_token
      end
    end
  end
end
```

## Linkkejä

- `SecureRandom.hex()` metodin dokumentaatio: [SecureRandom#hex](https://docs.ruby-lang.org/en/3.2/Random/Formatter.html#method-i-hex)
- Ruby Official API: [Ruby 3.2](https://docs.ruby-lang.org/en/3.2/)
- Ruby on Rails API: [Ruby on Rails API](http://api.rubyonrails.org/)

<hr>
<br>

[&larr; Takaisin OuluSaaS sivulle](/oulu-saas/)

<script src="/oulu-saas/asciinema/asciinema-player.min.js"></script>
<script>
      AsciinemaPlayer.create('/oulu-saas/session2.cast', document.getElementById('cast1'));
</script>