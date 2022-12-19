module.exports = {
    log: {
        level: 'silly',
        disabled: false,
    },
    cors: {
        origins: ['http://127.0.0.1:3000'],
        maxAge: 3 * 60 * 60,
        credentials: true
    },

};