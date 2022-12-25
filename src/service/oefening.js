const {getLogger, debugLog} = require('../core/logging');
const oefeningRepository = require('../repository/oefening');
const klasRepository = require('../repository/klas');
const {createError} = require("../core/error");

const getAll = async () => {
    debugLog('Getting all oefeningen');
    const oefeningen = await oefeningRepository.getAll();
    return {
        items: oefeningen,
        count: oefeningen.length
    }
}

const getById = async (id) => {
    debugLog('Getting oefening by id', {id});
    return await oefeningRepository.getById(id);
}

const create = async (oefening) => {
    debugLog('Creating oefening', {oefening});
    let oefeningen = await oefeningRepository.getAll();
    if(oefeningen.find(o => o.naam === oefening.naam)){
        return createError('Oefening already exists', {oefening});
    }
    if(!oefening.naam || oefening.naam.length === 0){
        return createError('Oefening name is empty', {oefening});
    }
    if(!oefening.klas_id || oefening.klas_id.length === 0){
        return createError('Klas id is empty', {oefening});
    }
    if(await klasRepository.getById(oefening.klas_id) === null){
        return createError('Klas id does not exist', {oefening});
    }
    let newOefening = await oefeningRepository.create(oefening);
    return {
        ...oefening,
        id: newOefening
    }
}

module.exports = {
    getAll,
    getById,
    create,
};
