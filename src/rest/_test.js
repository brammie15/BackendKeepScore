const Router = require('koa-router');
const testService = require('../service/test');

const getAll = async (ctx) => {
    ctx.body = await testService.getAll();
}

const getById = async (ctx) => {
    const test = await testService.getById(ctx.params.id);
    ctx.body = test;
}

const createTest = async (ctx) => {
    const newTest = await testService.create({
        ...ctx.request.body
    });
    ctx.body = newTest;
}

module.exports = function installTestRouter(app){
    const router = new Router({
        prefix: '/test'
    });

    router.get('/', getAll);
    router.get('/:id', getById);
    router.post('/', createTest);

    app.use(router.routes()).use(router.allowedMethods());
}