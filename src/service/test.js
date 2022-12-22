const {getLogger} = require('../core/logging');
const testRepository = require('../repository/test');
const {createError} = require("../core/error");

const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
}

const getAll = async () => {
    debugLog('Getting all tests');
    const tests = await testRepository.getAll();
    return {
        items: tests,
        count: tests.length
    }
}

const getById = async (id) => {
    debugLog('Getting test by id', {id});
    return await testRepository.getById(id);
}

const create = async (test) => {
    debugLog('Creating test', {test});
    let tests = await testRepository.getAll();
    if(tests.find(t => t.naam === test.naam)){
        return createError('Test already exists', {test});
    }
    if(!test.naam || test.naam.length === 0){
        return createError('Test name is empty', {test});
    }
    await testRepository.create(test);
    return test;
}

const updateById = async (id, test) => {
    debugLog('Updating test', {test});
    let tests = await testRepository.getAll();
    if(tests.find(t => t.naam === test.naam)){
        return createError('Test already exists', {test});
    }
    if(!test.naam || test.naam.length === 0){
        return createError('Test name is empty', {test});
    }
    await testRepository.updateById(id, test);
    return test;
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
}
