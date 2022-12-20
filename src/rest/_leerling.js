const Router = require('koa-router');
const leerlingService = require('../service/leerling');

const getAll = async (ctx) => {
    ctx.body = await leerlingService.getAll();
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
    router.post('/', createLeerling);

    app.use(router.routes()).use(router.allowedMethods());
}