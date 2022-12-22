const Router = require('koa-router');
const leerlingService = require('../service/leerling');

const getAll = async (ctx) => {
    ctx.body = await leerlingService.getAll();
}

const getById = async (ctx) => {
    const leerling = await leerlingService.getById(ctx.params.id);
    ctx.body = leerling;
}

const createLeerling = async (ctx) => {
    const newLeerling = await leerlingService.create({
        ...ctx.request.body
    });
    ctx.body = newLeerling;
}

module.exports = function installLeerlingRouter(app){
    const router = new Router({
        prefix: '/leerling'
    });

    router.get('/', getAll);
    router.get('/:id', getById);
    router.post('/', createLeerling);

    app.use(router.routes()).use(router.allowedMethods());
}