const {execFile} = require('child_process');
/**
 *
 * @param {string} reposDir
 * @returns {Promise}
 */
module.exports = (reposDir) => {
    let options = [
        '-rf',
        reposDir
    ];
    return (new Promise((resolve, reject) => {
        execFile('rm', options, (err, data, errMess) => {
            if (err && errMess) {
                reject(errMess);
            }
            resolve();
        });
    }));
};
