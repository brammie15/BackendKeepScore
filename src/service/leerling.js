const {getLogger} = require('../core/logging');
const leerlingRepository = require('../repository/leerling');
const klasRepository = require("./klas");

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
        debugLog('Leerling already exists', {leerling});
        return {
            error: 'Leerling already exists'
        };
    }
    if(!leerling.naam || leerling.naam.length === 0){
        debugLog('Leerling name is empty', {leerling});
        return {
            error: 'Leerling name is empty'
        };
    }
    if(!leerling.klas_id || leerling.klas_id.length === 0){
        debugLog('Leerling klasId is empty', {leerling});
        return {
            error: 'klas_id is empty'
        };
    }
    let klassen  = await klasRepository.getAll();
    if(!klassen.items.find(k => k.id === leerling.klas_id)){
        debugLog('Klas does not exist', {leerling});
        return {
            error: 'Klas does not exist'
        };
    }
    await leerlingRepository.create(leerling);
    return leerling;
}

module.exports = {
    getAll,
    getById,
    create,
}