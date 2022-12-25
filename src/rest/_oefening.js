const Router = require('koa-router');
const klasService = require('../service/klas');
const oefeningService = require('../service/oefening');

const getAll = async (ctx) => {
    ctx.body = await klasService.getAll();
}

const getById = async (ctx) => {
    const oefening = await oefeningService.getById(ctx.params.id);
    ctx.body = oefening;
}

const createOefening = async (ctx) => {
    const newOefening = await oefeningService.create({
        ...ctx.request.body
    });
    ctx.body = newOefening;
}

module.exports = function installOefeningRouter(app){
    const router = new Router({
        prefix: '/oefening'
    });

    router.get('/', getAll);
    router.get('/:id', getById);
    router.post('/', createOefening);

    app.use(router.routes()).use(router.allowedMethods());
}