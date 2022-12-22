const {getKnex, tables} = require('../../data');
const {test} = require('../../data');

const getAll = async () => {
    return getKnex()(tables.test).select('*').orderBy(test.naam, 'asc');
}

const create = async (klas) => {
    const [id] = await getKnex()(tables.test).insert(klas);
    return id;
}

const getById = async (id) => {
    const klas = await getKnex()(tables.test).select('*').where('id', id).first();
    return klas;
}

const updateById = async (id, klas) => {
    const updated = await getKnex()(tables.test).update(klas).where(test.id, id);
    return getById(id);
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
};
