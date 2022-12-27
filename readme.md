# Readme van de KeepScore Backend #

## Intro ##

Hallo persoon die dit leest. Dit is dus de readme van de backend van KeepScore.

---

## Instlatie ##
Om de backend te installeren moet je eerst de volgende dingen doen:

1. Clone de reop
2. loop `npm install` in de root van de repo
3. maak een .env file aan in de root van de repo
4. voeg de volgende dingen toe aan de .env file:
```
   IS_DEV=true // aleen gebruiken als je in productie gaat
   SELF_CHECK=false //niet belangrijk
```
5. loop `npm start` en de server zal opstarten op poort 5000
---

## API ##
De API is gemaakt met kao en heeft de volgende structuur:

`/src` => De hoofdmap van alle broncode

`/data` => de hoofdmap van de database en de structuur van alle tafels

`/migrations` => hierin zitten de migrations van de databse (de code die de structuur aanmaakt)

`/seeds` => hierin zitten de dummy data voor de database (dit wordt nog afgezet bij de productie versie)

`/config` => de config van de server

## Structuur ##

De structuur is opgesplitst in 3 delen:

- rest
- serice
- repository
---
### rest ###
Hierin zitten de routes die Koa accepteerd en zo de corresponderende serivce call maakt om het request te voltooien.

---
### service ###
Hierin zitten de service calls die de repository aanroepen om de data op te halen en te verwerken.

---
### repository ###
Hierin zitten de functies die de database aanroepen om de data op te halen en te verwerken.


# Momentele veranderingen #

- [x] De database structuur is aangepast
- [ ] De config moet op 1 plaats komen
- [ ] nieuwe routes voor het vergemakkelijken van het ophalen van data
- [ ] nieuwe routes voor het aanpassen van data, vooral gericht op het minder focussen op Id based data

# Authors #

- [Bram Verhulst](https://github.com/brammie15)
- Thibaut Van Loo
- Miro Van Hoef

# Credits #

- [Koa](https://koajs.com/)
- [Knex](https://knexjs.org/)
- [Winston](https://github.com/winstonjs/winston)