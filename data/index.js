const {getLogger} = require('../src/core/logging');
const knex = require('knex');
const {
    join
} = require('path');


let knexInstance;


async function initializeData(){
    const logger = getLogger();
    const knexOptions = {
        client: 'sqlite3',
        connection: {
            filename: './data/db.db3'
        },
        seeds: {
            directory: join( 'seeds')
        }
    }
    knexInstance = knex(knexOptions);

    try {
        await knexInstance.raw('select 1+1 as result');
    } catch (err){
        logger.error('Error connecting to database', err);
        throw err;
    }
    try{
        await knexInstance.seed.run();
    }catch (e) {
        logger.error('Error seeding database', e);
    }


    logger.info('Database connection established');
    return knexInstance;
}

async function shutdownData() {
    const logger = getLogger();

    logger.info('Shutting down database connection');

    await knexInstance.destroy();
    knexInstance = null;

    logger.info('Database connection closed');
}

function getKnex() {
    if (!knexInstance) throw new Error('Please initialize the data layer before getting the Knex instance');
    return knexInstance;
}

const tables = {
    user: 'user',
    klas: 'klas',
    leerling: 'leerling',

    test: 'test',
    oefening: 'oefening',
    oefening_vraag: 'oefening_vraag',
    evaluatie: 'evaluatie',
};

const user = {
    id: 'id',
    naam: 'naam',
    auth0_id: 'auth0_id',
}

const klas = {
    id: 'id',
    naam: 'naam',
};

const leerling = {
    id: 'id',
    naam: 'naam',
    voornaam: 'voornaam',
    klas_id: 'klas_id',
};

const test = {
    id: 'id',
    datum: 'datum',
    naam: 'naam',
};

const oefening = {
    id: 'id',
    naam: 'naam',
    test_id: 'test_id',
}

const oefening_vraag = {
    id: 'id',
    oefening_id: 'oefening_id',
    score: 'score',
    beschrijving: 'beschrijving',
}

const evaluatie = {
    id: 'id',
    test_id: 'test_id',
    oefening_id: 'oefening_id',
    leerling_id: 'leerling_id',
    oefening_vraag_id: 'oefening_vraag_id',
}

module.exports = {
    tables,
    klas,
    test,
    oefening,
    oefening_vraag,
    leerling,
    evaluatie,
    user,
    getKnex,
    initializeData,
    shutdownData,
};