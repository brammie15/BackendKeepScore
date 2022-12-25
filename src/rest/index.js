const Router = require('koa-router');
const installHealthRouter = require('./_health');
const installKlasRouter = require('./_klas');
const installLeerlingRouter = require('./_leerling');
const installTestRouter = require('./_test');
const installOefeningRouter = require('./_oefening');
const installEvaluatieRouter = require('./_evaluatie');

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
    installTestRouter(router);
    installOefeningRouter(router);
    installEvaluatieRouter(router);


    app.use(router.routes()).use(router.allowedMethods());
}