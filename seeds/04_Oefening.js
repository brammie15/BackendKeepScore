const {tables} = require("../data");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(tables.oefening).truncate()
  await knex(tables.oefening).insert([
    {test_id: 1, naam: "Opwarmingsspel VolleyBal"},
    {test_id: 1, naam: "Positieve Mindset"},
    {test_id: 2, naam: "Positionering wedstrijdvorm"},
    {test_id: 2, naam: "Onderhands Toetsten"},
  ]);
};
