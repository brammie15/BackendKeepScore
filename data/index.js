const {getLogger} = require('../src/core/logging');
const knex = require('knex');

let knexInstance;


async function initializeData(){
    const logger = getLogger();
    const knexOptions = {
        client: 'sqlite3',
        connection: {
            filename: './data/db.db3'
        }
    }
    knexInstance = knex(knexOptions);

    try {
        await knexInstance.raw('select 1+1 as result');
    } catch (err){
        logger.error('Error connecting to database', err);
        throw err;
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
    testOnderdeel: 'testonderdeel',
    test: 'test',
    score: 'score',
    leerling: 'leerling',
    klas: 'klas',
};

const klas = {
    id: 'id',
    naam: 'naam',
};

const leerling = {
    id: 'id',
    naam: 'naam',
    klas_id: 'klas_id',
};

const test = {
    id: 'id',
    datum: 'datum',
    naam: 'naam',
};

const testOnderdeel = {
    id: 'id',
    test_id: 'test_id',
    naam: 'naam',
};

const score = {
    id: 'id',
    leerling_id: 'leerling_id',
    testonderdeel_id: 'testonderdeel_id',
    test_id: 'test_id',
    score: 'score',
    beschrijving: 'beschrijving',
};

module.exports = {
    tables,
    klas,
    leerling,
    test,
    testOnderdeel,
    score,
    getKnex,
    initializeData,
    shutdownData,
};