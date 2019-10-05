const {resolve: pathResolve} = require('path');
const env = require('dotenv').config().parsed;
const requireParams = [
    'SERVER_PORT',
    'PAGE_LIMIT',
];
let missingParams = requireParams.filter(field => !env[field]);
if (missingParams.length > 0) {
    throw new Error(`Please configure '.env' file. Missing parameters: ${missingParams.join(', ')}`);
}
module.exports = {
    SERVER_PORT: env.SERVER_PORT,
    PAGE_LIMIT: parseInt(env.PAGE_LIMIT),
};
