const Koa = require('koa');
const cors = require('@koa/cors');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installRest = require('./rest/index');
const {
    getLogger,
    initializeLogger
} = require('./core/logging')
const {initializeData} = require("../data");
const main = async () => {
    const NODE_ENV ='NODE_ENV';
    const LOG_LEVEL = config.get('log.level');
    const LOG_DISABLED = config.get('log.disabled');

    initializeLogger({
        level: LOG_LEVEL,
        disabled: LOG_DISABLED,
        defaultMeta: {
            NODE_ENV
        }
    });

    await initializeData();


    const app = new Koa();
    // app.use(cors())
    const logger = getLogger();


    app.use(bodyParser());

    app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });

    installRest(app);

    app.listen(3000);

    logger.info(`Server started on port 3000`);
}

main();