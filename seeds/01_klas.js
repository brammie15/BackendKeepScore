/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const {tables} = require("../data");
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(tables.klas).truncate()
  await knex(tables.klas).insert([
    {naam: '307'},
    {naam: '308'},
    {naam: '509'},
    {naam: '508'},
    {naam: '501'},
  ]);
};
