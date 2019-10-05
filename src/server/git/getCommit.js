const {execFile} = require('child_process');
const getCountCommits = require('./getCountCommits.js');
const env = require('./../env.js');
/**
 *
 * @param {string} reposDir
 * @param {string} commitHash
 * @returns {Promise}
 */
module.exports = (reposDir, commitHash, page) => {
    return (new Promise((resolve, reject) => {
        page = parseInt(page) || 1;
        if (page < 1) {
            reject(`Incorrect page '${page}'`);
        }
        getCountCommits(reposDir, commitHash)
            .then(countCommits => {
                let maxPageNumber = Math.ceil(countCommits / env.PAGE_LIMIT);
                if (page > maxPageNumber) {
                    reject(`Incorrect page '${page}'. Maximum page '${maxPageNumber}'`);
                }
                const commitDelimiter = '-----';
                const format = [commitDelimiter, '%H', '%at', '%s'].join('%n');
                let options = [
                    `--format=${format}`,
                    '-' + env.PAGE_LIMIT,
                    `--skip=${(page - 1) * env.PAGE_LIMIT}`
                ];
                if (commitHash) {
                    options.push(commitHash);
                }
                options.unshift('log');

                execFile('git', options, {cwd: reposDir}, (err, data, errMess) => {
                    if (err && errMess) {
                        reject(errMess);
                    }
                    let commits = data.split(commitDelimiter)
                        .map(value => value.trim())
                        .filter(value => value.length > 0)
                        .map(value => {
                            let commitData = value.trim().split("\n");
                            let hash = commitData.shift();
                            let timestamp = commitData.shift();
                            let source = commitData.join("/n");
                            return {hash, timestamp, source};
                        });
                    resolve({
                        commits,
                        meta: {
                            page,
                            onPage: env.PAGE_LIMIT,
                            total: countCommits
                        }
                    });
                });
            })
            .catch(error => {
                reject(error);
            });
    }));
};
