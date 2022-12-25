const {getKnex, tables, oefening_vraag} = require('../../data');


const getAll = async () => {
    return getKnex()(tables.oefening_vraag).select('*').orderBy(oefening_vraag.id, 'asc');
}

const create = async (oefening_vraag) => {
    const [id] = await getKnex()(tables.oefening_vraag).insert(oefening_vraag);
    return id;
}

const getById = async (id) => {
    const oefening_vraag = await getKnex()(tables.oefening_vraag).select('*').where('id', id);
    return oefening_vraag;
}

const updateById = async (id, oefening_vraag) => {
    const updated = await getKnex()(tables.oefening_vraag).update(oefening_vraag).where(oefening_vraag.id, id);
    return getById(id);
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
}