const {getKnex, tables} = require('../../data');
const {evaluatie} = require('../../data');

const getAll = async () => {
    return getKnex()(tables.evaluatie).select('*').orderBy(evaluatie.id, 'asc');
}

const create = async (evaluatie) => {
    const [id] = await getKnex()(tables.evaluatie).insert(evaluatie);
    return id;
}

const getById = async (id) => {
    const evaluatie = await getKnex()(tables.evaluatie).select('*').where('id', id);
    return evaluatie;
}

const updateById = async (id, evaluatie) => {
    const updated = await getKnex()(tables.evaluatie).update(evaluatie).where(evaluatie.id, id);
}

const getAllEvaluatiesByLeerlingId = async (id) => {
    return getKnex()(tables.evaluatie).select('*').where('leerling_id', id);
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
    getAllEvaluatiesByLeerlingId,
};