---
title: Oulu SaaS - Session 2
layout: plain_with_title_asciinema
---
# Oulu SaaS - Session 2

Toisen session asiat videomuodossa, paina play! ▶️🙂

Videon voi pysäyttää painamalla välilyöntiä, nuoli oikealle/vasemmalle hyppää 5sec eteenpäin/taaksepäin.


<div id="cast1">
</div>
<details>
  <summary>Kaikki näppäinoikotiet</summary>
  <ul dir="auto">
    <li><kbd>space</kbd> - play / pause</li>
    <li><kbd>f</kbd> - toggle fullscreen mode</li>
    <li><kbd>←</kbd> / <kbd>→</kbd> - rewind by 5 seconds / fast-forward by 5 seconds</li>
    <li><kbd>Shift</kbd> + <kbd>←</kbd> / <kbd>Shift</kbd> + <kbd>→</kbd> - rewind by 10% / fast-forward by 10%</li>
    <li><kbd>[</kbd> - rewind to the previous <a href="#markers-1">marker</a></li>
    <li><kbd>]</kbd> - fast-forward to the next <a href="#markers-1">marker</a></li>
    <li><kbd>0</kbd>, <kbd>1</kbd>, <kbd>2</kbd> ... <kbd>9</kbd> - jump to 0%, 10%, 20% ... 90%</li>
    <li><kbd>.</kbd> - step through a recording a frame at a time (when paused)</li>
  </ul>
</details>

## Linkkejä

- Perustietoa ActiveRecord:sta: [Ruby on Rails Guides - ActiveRecord basics](https://guides.rubyonrails.org/active_record_basics.html)
- Miten tehdään tietomallilla validaattoreita: [ActiveRecord Validations](https://guides.rubyonrails.org/active_record_validations.html)
- Miten kutsutaan metodia kun jokin tietto operaatio tapahtuu tietomallin sisällä: [ActiveRecord Callbacks](https://guides.rubyonrails.org/active_record_callbacks.html) (Käytettiin `presence` ja `uniqueness` validaattoreita)

## Konsolikomentoja

`rails console -s` käynnistää Rails konsolin "hiekkalaatikko"-tilassa, jolloin kaikki konsolissa tehdyt muutokset peruuntuvat kun poistutaan Rails konsolista.

`rails generate migration Link` luo luokan ja migraatiotiedoston tietomallille nimeltään Link.

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
  # https://guides.rubyonrails.org/active_record_validations.html

  validates :url, presence: true
  validates :token, uniqueness: true

  # https://guides.rubyonrails.org/active_record_callbacks.html
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