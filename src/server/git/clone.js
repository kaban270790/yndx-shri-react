const {execFile} = require('child_process');
const env = require('./../env.js');
/**
 *
 * @param {string} dir
 * @param {string} url
 * @param {string} name
 * @returns {Promise}
 */
module.exports = (dir, url, name) => {
    let options = [
        'clone',
        url
    ];
    if (name) {
        options.push(name);
    }
    return (new Promise((resolve, reject) => {
        execFile('git', options, {cwd: dir}, (err, data, errMess) => {
            if (err && errMess) {
                reject(errMess);
            }
            resolve();
        });
    }));
};
