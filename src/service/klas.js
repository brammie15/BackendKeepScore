const {getLogger} = require('../core/logging');
const klasRepository = require('../repository/klas');

const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
}

const getAll = async () => {
    debugLog('Getting all klasses');
    const klassen = await klasRepository.getAll();
    return {
        items: klassen,
        count: klassen.length
    }
}

const getById = async (id) => {
    debugLog('Getting klas by id', {id});
    return await klasRepository.getById(id);
}

const create = async (klas) => {
    debugLog('Creating klas', {klas});
    let klasses = await klasRepository.getAll();
    if(klasses.find(k => k.naam === klas.naam)){
        debugLog('Klas already exists', {klas});
        return {
            error: 'Klas already exists'
        };
    }
    if(!klas.naam || klas.naam.length === 0){
        debugLog('Klas name is empty', {klas});
        return {
            error: 'Klas name is empty'
        };
    }
    await klasRepository.create(klas);
    return klas;
}

module.exports = {
    getAll,
    getById,
    create,
};
