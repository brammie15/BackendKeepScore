const {tables} = require("../data");


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(tables.test).del()
  await knex(tables.test).insert([
    {naam: "Evaluatie VolleyBal Opwarmingsspel", datum: "2020-01-01"},
    {naam: "Evaluatie VolleyBal Wedstrijd 4 tegen 4", datum: "2020-01-01"},

  ]);
};
