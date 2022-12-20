const {getKnex, tables} = require('../../data');
const {klas} = require('../../data');

const getAll = async () => {
    return getKnex()(tables.klas).select('*').orderBy('naam', 'asc');
}

const create = async (klas) => {
    const [id] = await getKnex()(tables.klas).insert(klas);
    return id;
}

const getById = async (id) => {
    const klas = await getKnex()(tables.klas).select('*').where('id', id);
    return klas;
}

const updateById = async (id, klas) => {
    const updated = await getKnex()(tables.klas).update(klas).where(klas.id, id);
    return getById(id);
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
};
