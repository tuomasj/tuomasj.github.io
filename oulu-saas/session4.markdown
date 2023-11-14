---
title: Oulu SaaS - Session 4
layout: plain_with_title_asciinema
---
# Oulu SaaS - Session 4

Tehdään pieni Ruby on Rails-applikaatio jossa toteutetaan PRG eli [Post-Redirect-Get](https://en.wikipedia.org/wiki/Post/Redirect/Get)-malli.

Alla olevat screencastit ovat tallennettu tekstimuotoisina, joten kaikki HTTP-kutsut ovat tehty selaimella. Selain ei näy näissä screencasteissa ruudulla, mutta selaimella tehdyt kutsut näkyvät `rails server`-logissa.

## Osa 1 - Luodaan tietokannan rakenne, migraatio ja tietomalli

- Tietomalli ja migraatiotiedosto `url` ja `token`-attribuuteille voidaan luoda samalla kertaa käyttämällä `rails generate`-komentorivityökalua: `rails g model Link url:string token:string`
- Käynnistä applikaation oma konsoli komennolla `rails console` tai lyhennetty versio `rails c`

<div id="cast1">
</div>
<br>


## Osa 2 - Tehdään kontrolleri ja lomake, joka tallettaa syötetyn tiedon tietokantaan

- Luo kontrolleri komennolla `rails g controller Links`
- Voit myös käsin luodan tiedoston `app/controllers/links_controller.rb` ja luoda tyhjän kansion `app/views/links`

<div id="cast2">
</div>

## Osa 3 - Näytetään lomakkeen virheilmoitukset ja listataan kaikki Link-tietueet

- Jokaisella ActiveRecord-objektilla on `errors`-metodi, joka palauttaa listan validaation virheistä (tässä tapauksessa `@link.errors`)
- Metodi palauttaa listan virheistä (Array), jolloin palautuneelle listalle voidaan käyttää `@link.errors.any?`-metodia -- Metodi joka loppuu kysymysmerkkiin palauttaa boolean-arvon (`true` tai `false`)
- Tässä screencastissa tehdään myös partial, eli pilkotaan näkymää pienempiin osiin, tiedosto on `app/views/links/_link.html.erb`
- Muista että partial-näkymän tiedostonimi alkaa aina "`_`"-kirjaimella.

<div id="cast3">
</div>

## Jatkoa

Mikäli intoa riittää, voit lisätä applikaatioon käyttäjän autentikaation seuraamalla GoRails-screencastiä [Rails 7.1 - Authentication from scratch](https://www.youtube.com/watch?v=Hb9WtQf9K60)


<hr>
<br>




[&larr; Takaisin OuluSaaS sivulle](/oulu-saas/)

<script src="/oulu-saas/asciinema/asciinema-player.min.js"></script>
<script>
  AsciinemaPlayer.create('/oulu-saas/session4-part1.cast', document.getElementById('cast1'));
  AsciinemaPlayer.create('/oulu-saas/session4-part2.cast', document.getElementById('cast2'));
  AsciinemaPlayer.create('/oulu-saas/session4-part3.cast', document.getElementById('cast3'));
</script>