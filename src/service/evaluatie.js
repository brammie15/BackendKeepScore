const {getLogger, debugLog} = require('../core/logging');
const evaluatieRepository = require('../repository/evaluatie');
const {createError} = require("../core/error");

const getAll = async () => {
    debugLog('Getting all evaluaties');
    const evaluaties = await evaluatieRepository.getAll();
    return {
        items: evaluaties,
        count: evaluaties.length
    }
}

const getById = async (id) => {
    debugLog('Getting evaluatie by id', {id});
    return await evaluatieRepository.getById(id);
}

const create = async (evaluatie) => {
    debugLog('Creating evaluatie', {evaluatie});
    let evaluaties = await evaluatieRepository.getAll();
    if(evaluaties.find(e => e.naam === evaluatie.naam)){
        return createError('Evaluatie already exists', {evaluatie});
    }
    if(!evaluatie.naam || evaluatie.naam.length === 0){
        return createError('Evaluatie name is empty', {evaluatie});
    }
    let newEvaluatie = await evaluatieRepository.create(evaluatie);
    return {
        ...evaluatie,
        id: newEvaluatie
    }
}

const getEvaluatieByLeerlingId = async (leerling_id) => {
    debugLog('Getting evaluatie by leerling id', {leerling_id});
    return evaluatieRepository.getEvaluatieByLeerlingId(leerling_id);
}

module.exports = {
    getAll,
    getById,
    create,
    getEvaluatieByLeerlingId,
};
