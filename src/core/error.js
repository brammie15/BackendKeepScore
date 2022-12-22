const {getLogger} = require('./logging');

function createError(message, meta = {}) {
    getLogger().error("Error hit: " + message, meta);
    return {
        error: message,
        meta: meta
    };
}

module.exports = {
    createError
}