const Router = require('koa-router');
const klasService = require('../service/klas');

const getAll = async (ctx) => {
    ctx.body = await klasService.getAll();
}

const getById = async (ctx) => {
    const klas = await klasService.getById(ctx.params.id);
    ctx.body = klas;
}

const createKlas = async (ctx) => {
    const newKlas = await klasService.create({
        ...ctx.request.body
    });
    ctx.body = newKlas;
}

const getLeerlingenByKlasId = async (ctx) => {
    const leerlingen = await klasService.getLeerlingenByKlasId(ctx.params.id);
    ctx.body = leerlingen;
}
module.exports = function installKlasRouter(app){
    const router = new Router({
        prefix: '/klas'
    });

    router.get('/', getAll);
    router.get('/leerlingen/:id', getLeerlingenByKlasId);
    router.get('/:id', getById);
    router.post('/', createKlas);

    app.use(router.routes()).use(router.allowedMethods());
}