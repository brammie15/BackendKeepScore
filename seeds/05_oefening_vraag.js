const {tables} = require("../data");


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(tables.oefening_vraag).del()
  await knex(tables.oefening_vraag).insert([
    {oefening_id: 1, score: 4, beschrijving: '4 Het gaat zeer goed!'},
    {oefening_id: 1, score: 3, beschrijving: '3 Het gaat niet zo vlot'},
    {oefening_id: 1, score: 2, beschrijving: '2 Het gaat Twijfelend'},
    {oefening_id: 1, score: 1, beschrijving: '1 Het gaat niet goed'},
    {oefening_id: 2, score: 4, beschrijving: '4 Het gaat zeer goed!'},
    {oefening_id: 2, score: 3, beschrijving: '3 Het gaat niet zo vlot'},
    {oefening_id: 2, score: 2, beschrijving: '2 Het gaat Twijfelend'},
    {oefening_id: 2, score: 1, beschrijving: '1 Het gaat niet goed'},
    {oefening_id: 3, score: 4, beschrijving: '4 Het gaat zeer goed!'},
    {oefening_id: 3, score: 3, beschrijving: '3 Het gaat niet zo vlot'},
    {oefening_id: 3, score: 2, beschrijving: '2 Het gaat Twijfelend'},
    {oefening_id: 3, score: 1, beschrijving: '1 Het gaat niet goed'},
  ]);
};
