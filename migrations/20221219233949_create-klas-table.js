const {tables, klas, test, oefening_vraag, oefening, leerling, evaluatie, user} = require('../data/index')

exports.up = function(knex) {
    return knex.schema.createTable(tables.klas, tbl => {
        tbl.increments().primary();
        tbl.string(klas.naam, 64).notNullable();
        tbl.timestamps(true, true);
    })
    .createTable(tables.leerling, tbl => {
        tbl.increments().primary();
        tbl.string(leerling.naam, 64).notNullable().index();
        tbl.string(leerling.voornaam, 64).notNullable().index();
        tbl.integer(leerling.klas_id).unsigned().notNullable().references(klas.id).inTable(tables.klas).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.timestamps(true, true);
    })
    .createTable(tables.user, tbl => {
        tbl.increments().primary();
        tbl.string(user.naam, 64).notNullable().index();
        tbl.string(user.auth0_id, 128).notNullable().index();
        tbl.timestamps(true, true);
    })
    .createTable(tables.test, tbl => {
        tbl.increments().primary();
        tbl.date(test.datum).notNullable();
        tbl.string(test.naam, 64).notNullable();
        tbl.timestamps(true, true);
    })
    .createTable(tables.oefening, tbl => {
        tbl.increments().primary();
        tbl.integer(oefening.test_id).unsigned().notNullable().references(test.id).inTable(tables.test).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.string(oefening.naam, 128).notNullable();
        tbl.timestamps(true, true);
    })
    .createTable(tables.oefening_vraag, tbl => {
        tbl.increments().primary();
        tbl.integer(oefening_vraag.oefening_id).unsigned().notNullable().references(oefening.id).inTable(tables.oefening).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer(oefening_vraag.score).notNullable();
        tbl.string(oefening_vraag.beschrijving, 256).notNullable();
        tbl.timestamps(true, true);
    })
    .createTable(tables.evaluatie, tbl => {
        tbl.increments().primary();
        tbl.integer(evaluatie.leerling_id).unsigned().notNullable().references(leerling.id).inTable(tables.leerling).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer(evaluatie.test_id).unsigned().notNullable().references(test.id).inTable(tables.test).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer(evaluatie.oefening_id).unsigned().notNullable().references(oefening.id).inTable(tables.oefening).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.integer(evaluatie.oefening_vraag_id).unsigned().notNullable().references(oefening_vraag.id).inTable(tables.oefening_vraag).onDelete('CASCADE').onUpdate('CASCADE');
        tbl.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists(tables.evaluatie).dropTableIfExists(tables.oefening_vraag).dropTableIfExists(tables.oefening).dropTableIfExists(tables.test).dropTableIfExists(tables.leerling).dropTableIfExists(tables.klas).dropTableIfExists(tables.user);
};
