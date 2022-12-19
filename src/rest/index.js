const Router = require('koa-router');
const installHealthRouter = require('./_health');

const sendHello = async (ctx) => {
    ctx.body = 'Welcome to the API';
}

module.exports = function installRest(app) {
    const router = new Router({
        prefix: '/api'
    });

    router.get('/', sendHello);
    installHealthRouter(router);

    app.use(router.routes()).use(router.allowedMethods());
}