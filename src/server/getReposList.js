const fs = require("fs");
const {resolve: pathResolve} = require("path");
const gitLog = require("./git/Log.js");
/**
 *
 * @param {string} reposDir
 * @returns {Promise}
 */
module.exports = (reposDir) => {
    return (new Promise((resolve, reject) => {
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
            }
        });
    }).then(async (repositories) => {
        for (let i = 0, l = repositories.length; i < l; i++) {
            await gitLog(pathResolve(reposDir, repositories[i].name), {
                pageLimit: 1,
            }).then(commits => {
                repositories[i].lastCommit = commits.shift();
            });
        }
        return repositories;
    });
};
