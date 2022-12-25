const {getKnex, tables} = require('../../data');
const {oefening} = require('../../data');

const getAll = async () => {
    return getKnex()(tables.oefening).select('*').orderBy(oefening.naam, 'asc');
}

const create = async (oefening) => {
    const [id] = await getKnex()(tables.oefening).insert(oefening);
    return id;
}

const getById = async (id) => {
    const oefening = await getKnex()(tables.oefening).select('*').where('id', id);
    return oefening;
}

const updateById = async (id, oefening) => {
    const updated = await getKnex()(tables.oefening).update(oefening).where(oefening.id, id);
    return getById(id);
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
};
