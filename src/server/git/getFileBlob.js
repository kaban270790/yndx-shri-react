const {execFile} = require('child_process');
const env = require('./../env.js');
/**
 *
 * @param {string} reposDir
 * @param {string} commitHash
 * @param {string} path
 * @returns {Promise}
 */
module.exports = (reposDir, commitHash, path) => {
    let options = [
        'show',
        `${commitHash}:${path}`
    ];
    return (new Promise((resolve, reject) => {
        execFile('git', options, {cwd: reposDir}, (err, data, errMess) => {
            if (err && errMess) {
                reject(errMess);
            }
            resolve(data);
        });
    }));
};
