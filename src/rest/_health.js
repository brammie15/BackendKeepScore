const healthService = require('../service/health');
const Router = require('koa-router');

const ping = async (ctx) => {
    ctx.body = healthService.ping();
}

module.exports = function installHealthRouter(app){
    const router = new Router({
        prefix: '/health'
    });

    router.get('/ping', ping);

    app.use(router.routes()).use(router.allowedMethods());
}