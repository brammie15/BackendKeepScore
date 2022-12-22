const {getLogger} = require('../core/logging');
const leerlingRepository = require('../repository/leerling');
const klasRepository = require("./klas");
const {createError} = require("../core/error");

const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
}

const getAll = async () => {
    debugLog('Getting all leerlingen');
    const leerlingen = await leerlingRepository.getAll();
    return {
        items: leerlingen,
        count: leerlingen.length
    }
}

const getById = async (id) => {
    debugLog('Getting leerling by id', {id});
    return await leerlingRepository.getById(id);
}

const create = async (leerling) => {
    debugLog('Creating leerling', {leerling});
    let leerlingen = await leerlingRepository.getAll();
    if(leerlingen.find(l => l.naam === leerling.naam)){
        return createError('Leerling already exists', {leerling});
    }
    if(!leerling.naam || leerling.naam.length === 0){
        return createError('Leerling name is empty', {leerling});
    }
    if(!leerling.klas_id || leerling.klas_id.length === 0){
        return createError('Leerling klas_id is empty', {leerling});
    }
    let klassen  = await klasRepository.getAll();
    if(!klassen.items.find(k => k.id === leerling.klas_id)){
        return createError('Leerling klas_id does not exist', {leerling});
    }
    await leerlingRepository.create(leerling);
    return leerling;
}

module.exports = {
    getAll,
    getById,
    create,
}