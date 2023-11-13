---
title: Oulu SaaS - Session 2
layout: plain_with_title_asciinema
---
# Oulu SaaS - Session 2


## Active Record ja Tietokannan indeksi

Luodaan `links`-niminen taulu jolla on `url` ja `token` attribuutit. Molemmilla attribuuteilla on `null: false` eli alla oleva tietokanta ei suostu luomaan uutta tietuetta mikäli `url` tai `token` ovat tyhjiä.

Tämä migraatio on luotu rails-komentorivityökalulla `rails generate migration create_links`. Huom, links-taulu tietokannassa vaatii `Link`-tietomallin `app/models`-kansiossa.

```
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

```
class AddUniqueIndexToLink < ActiveRecord::Migration[7.1]
  def change
    add_index :links, :token, unique: true
  end
end
```

