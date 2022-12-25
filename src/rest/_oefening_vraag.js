const Router = require('koa-router');
const oefeningService = require('../service/oefening');
const oefeningVraagService = require('../service/oefening_vraag');

const getAll = async (ctx) => {
    ctx.body = await oefeningService.getAll();
}

const getById = async (ctx) => {
    const oefeningVraag = await oefeningService.getById(ctx.params.id);
    ctx.body = oefeningVraag;
}

const createOefeningVraag = async (ctx) => {
    const newOefeningVraag = await oefeningVraagService.create({
        ...ctx.request.body
    });
    ctx.body = newOefeningVraag;
}

module.exports = function installOefeningVraagRouter(app){
    const router = new Router({
        prefix: '/oefening_vraag'
    });

    router.get('/', getAll);
    router.get('/:id', getById);
    router.post('/', createOefeningVraag);

    app.use(router.routes()).use(router.allowedMethods());
}