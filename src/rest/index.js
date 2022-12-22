const Router = require('koa-router');
const installHealthRouter = require('./_health');
const installKlasRouter = require('./_klas');
const installLeerlingRouter = require('./_leerling');
const installTestRouter = require('./_test');

const sendHello = async (ctx) => {
    ctx.body = 'Welcome to the API';
}

module.exports = function installRest(app) {
    const router = new Router({
        prefix: '/api'
    });

    router.get('/', sendHello);
    installHealthRouter(router);
    installKlasRouter(router);
    installLeerlingRouter(router);
    // installTestRouter(router);

    app.use(router.routes()).use(router.allowedMethods());
}