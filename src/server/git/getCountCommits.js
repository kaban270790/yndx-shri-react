const {execFile} = require('child_process');
/**
 *
 * @param {string} reposDir
 * @param {string} commitHash
 * @returns {Promise}
 */
module.exports = (reposDir, commitHash) => {
    let options = [
        'rev-list',
        '--count',
        commitHash || 'HEAD'
    ];
    return (new Promise((resolve, reject) => {
        execFile('git', options, {cwd: reposDir}, (err, data, errMess) => {
            if (err && errMess) {
                reject(errMess);
            }
            resolve(parseInt(data));
        });
    }));
};
