const Koa = require('koa');
const cors = require('@koa/cors');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installRest = require('./rest/index');
const fs = require('fs');
const path = require('path');
const https = require('https');
const {
    getLogger,
    initializeLogger
} = require('./core/logging')
const {initializeData} = require("../data");

const isDevelopment = true;

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
    let serverConfig = {};
    if(!isDevelopment){
        const serverConfig = {
            domain: 'brammie15.dev', // your domain
            https: {
                port: 5000, // any port that is open and not already used on your server
                options: {
                    key: fs.readFileSync(path.resolve(process.cwd(), 'certs/privkey.pem'), 'utf8').toString(),
                    cert: fs.readFileSync(path.resolve(process.cwd(), 'certs/fullchain.pem'), 'utf8').toString(),
                },
            },
        };
    }
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

    if(isDevelopment){
        app.listen(5000);
    }else{
        const httpServer = https.createServer(serverConfig.https.options, app.callback()).listen(config.https.port);
        httpServer.listen(serverConfig.https.port, () => {
            logger.info(`HTTPS server listening on port ${config.https.port}`);
        });
    }


    logger.info(`Server started on port 5000`);
}


main();