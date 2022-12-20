const {tables, klas, leerling, score, testOnderdeel, test} = require('../data/index')

exports.up = function(knex) {
    return knex.schema.createTable(tables.klas, tbl => {
        tbl.increments().primary();
        tbl.string(klas.naam, 64).notNullable();
        tbl.timestamps(true, true);
    })
    .createTable(tables.leerling, tbl => {
        tbl.increments().primary();
        tbl.string(leerling.naam, 64).notNullable().index();
        tbl.integer(leerling.klas_id).unsigned().notNullable().references(klas.id).inTable(tables.klas).onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable(tables.test, tbl => {
        tbl.increments().primary();
        tbl.date(test.datum).notNullable();
        tbl.string(test.naam, 64).notNullable();
    })
    .createTable(tables.testOnderdeel, tbl => {
        tbl.increments().primary();
        tbl.integer(testOnderdeel.test_id).unsigned().notNullable().references(test.id).inTable(tables.test).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.string(testOnderdeel.naam, 64).notNullable();
    })
    .createTable(tables.score, tbl => {
        tbl.increments().primary();
        tbl.integer(score.leerling_id).unsigned().notNullable().references(leerling.id).inTable(tables.leerling).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer(score.testonderdeel_id).unsigned().notNullable().references(testOnderdeel.id).inTable(tables.testOnderdeel).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer(score.test_id).unsigned().notNullable().references(test.id).inTable(tables.test).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer(score.score).notNullable();
        tbl.string(score.beschrijving, 1024).notNullable();
    })
    .createTable(tables.)
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tables.score).dropTableIfExists(tables.testOnderdeel).dropTableIfExists(tables.test).dropTableIfExists(tables.leerling).dropTableIfExists(tables.klas);
};
