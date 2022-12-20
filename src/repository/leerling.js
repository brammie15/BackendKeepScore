const {getKnex, tables} = require('../../data');

const getAll = async () => {
    return getKnex()(tables.leerling).select('*').orderBy('naam', 'asc');
}

const create = async (klas) => {
    const [id] = await getKnex()(tables.leerling).insert(klas);
    return id;
}

const getById = async (id) => {
    const klas = await getKnex()(tables.leerling).select('*').where('id', id).first();
    return klas;
}

module.exports = {
    getAll,
    create,
    getById,
}