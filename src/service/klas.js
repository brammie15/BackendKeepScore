const {getLogger, debugLog} = require('../core/logging');
const klasRepository = require('../repository/klas');
const {createError} = require("../core/error");


const getAll = async () => {
    debugLog('Getting all klasses');
    const klassen = await klasRepository.getAll();
    return {
        items: klassen,
        count: klassen.length
    }
}

const getLeerlingenByKlasId = async (id) => {
    debugLog('Getting leerlingen by klas id', {id});
    return await klasRepository.getLeerlingenByKlasId(id);
}

const getById = async (id) => {
    debugLog('Getting klas by id', {id});
    return await klasRepository.getById(id);
}

const create = async (klas) => {
    debugLog('Creating klas', {klas});
    let klasses = await klasRepository.getAll();
    if(klasses.find(k => k.naam === klas.naam)){
        return createError('Klas already exists', {klas});
    }
    if(!klas.naam || klas.naam.length === 0){
        return createError('Klas name is empty', {klas});
    }
    let newKlas = await klasRepository.create(klas);
    return {
        ...klas,
        id: newKlas
    }
}

module.exports = {
    getAll,
    getById,
    create,
    getLeerlingenByKlasId,
};
