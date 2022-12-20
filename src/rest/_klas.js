const Router = require('koa-router');
const klasService = require('../service/klas');

const getAll = async (ctx) => {
    ctx.body = await klasService.getAll();
}

const createKlas = async (ctx) => {
    const newKlas = await klasService.create({
        ...ctx.request.body
    });
    ctx.body = newKlas;
}

module.exports = function installKlasRouter(app){
    const router = new Router({
        prefix: '/klas'
    });

    router.get('/', getAll);
    router.post('/', createKlas);

    app.use(router.routes()).use(router.allowedMethods());
}