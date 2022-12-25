const Koa = require('koa');
const cors = require('@koa/cors');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installRest = require('./rest/index');
const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');
const {
    getLogger,
    initializeLogger
} = require('./core/logging')
const {initializeData} = require("../data");
const Process = require("process");

const isDevelopment = process.env.IS_DEV;

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
                port: 443, // any port that is open and not already used on your server
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
        const httpServer = https.createServer(serverConfig.https.options, app.callback());
        httpServer.listen(serverConfig.https.port, () => {
            logger.info(`HTTPS server listening on port ${serverConfig.https.port}`);
        });

        //test if https works
        if(Process.env.SELF_CHECK){
            axios.get("https://" + serverConfig.domain).then((res) => {
            if(res.status === 200){
                logger.info('HTTPS works');
            }else{
                logger.error('HTTPS does not work');
            }
            });
        }
    }

    if(isDevelopment){
        logger.info(`Server started on port 5000`);
    }
}


main();