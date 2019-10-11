const fs = require("fs");
const {resolve: pathResolve} = require("path");
const gitLog = require("./git/Log.js");
/**
 *
 * @param {string} reposDir
 * @returns {Promise}
 */
module.exports = (reposDir) => {
    const promise = (new Promise((resolve, reject) => {
        fs.readdir(reposDir, {withFileTypes: true}, (err, files) => {
            if (err) {
                reject(err)
            }
            resolve(files);
        });
    })).then(files => {
        return files.filter(pathStat => pathStat.isDirectory());
    }).then(files => {
        return files.map(pathStat => {
            return {
                name: pathStat.name,
                // lastCommit: {},
            }
        });
    }).then(repositories => {
        let promiseGetCommits = (new Promise(resolve => resolve(repositories)));
        repositories.map((repository, index) => {
            promiseGetCommits.then(async (repositories) => {
                return await gitLog(pathResolve(reposDir, repository.name), {
                    pageLimit: 1,
                }).then(commits => {
                    if (commits && commits.length > 0) {
                        repositories[index].lastCommit = commits.shift();
                    }
                    return repositories
                });
            });
        });
        return promiseGetCommits;
    });

    return promise;
};
