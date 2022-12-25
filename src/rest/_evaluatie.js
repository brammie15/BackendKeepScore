const Router = require('koa-router');
const evaluatieService = require('../service/evaluatie');

const getAll = async (ctx) => {
    ctx.body = await evaluatieService.getAll();
}

const getById = async (ctx) => {
    const evaluatie = await evaluatieService.getById(ctx.params.id);
    ctx.body = evaluatie;
}

const createEvaluatie = async (ctx) => {
    const newEvaluatie = await evaluatieService.create({
        ...ctx.request.body
    });
    ctx.body = newEvaluatie;
}

const getEvaluatieByLeerlingId = async (ctx) => {
    const evaluatie = await evaluatieService.getAllEvaluatiesByLeerlingId(ctx.params.id);
    ctx.body = evaluatie;
}

module.exports = function installEvaluatieRouter(app){
    const router = new Router({
        prefix: '/evaluatie'
    });

    router.get('/', getAll);
    router.get('/:id', getById);
    router.get('/leerling/:id', getEvaluatieByLeerlingId);
    router.post('/', createEvaluatie);

    app.use(router.routes()).use(router.allowedMethods());
}