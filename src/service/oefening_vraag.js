const {debugLog} = require('../core/logging');
const oefeningRepository = require('../repository/oefening');
const oefening_vraagRepository = require('../repository/oefening_vraag');
const {createError} = require("../core/error");
const {oefening_vraag} = require("../../data");

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
        return createError('OefeningVraag already exists', {oefening});
    }
    if(!oefening.naam || oefening.naam.length === 0){
        return createError('Oefening name is empty', {oefening});
    }
    if(!oefening.klas_id || oefening.klas_id.length === 0){
        return createError('Klas id is empty', {oefening});
    }
    if(await oefeningRepository.getById(oefening_vraag.oefening_id) === null){
        return createError('Oefening id is not linked to a real oefening', {oefening});
    }
    let newOefeningVraag = await oefeningRepository.create(oefening);
    return {
        ...newOefeningVraag,
        id: newOefeningVraag
    }
}