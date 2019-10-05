const fs = require('fs');
const {resolve: pathResolve} = require('path');

module.exports = {
    isExist: (reposDir, reposId) => {
        return (new Promise((resolve, reject) => {
            let reposFullPath = pathResolve(reposDir, reposId);
            fs.stat(reposFullPath, (err, stats, errMess) => {
                if (err && errMess) {
                    reject(errMess);
                }
                if (!stats || !stats.isDirectory()) {
                    reject(`Repository "${reposId}" not found`)
                }
                resolve(reposFullPath);
            });
        }))
    },
    isNotExist: (reposDir, reposId) => {
        return (new Promise((resolve, reject) => {
            if(!reposId) {
                resolve();
            }
            let reposFullPath = pathResolve(reposDir, reposId);
            fs.stat(reposFullPath, (err, stats, errMess) => {
                if (err && errMess) {
                    reject(errMess);
                }
                if (!stats || !stats.isDirectory()) {
                    resolve()
                }
                reject(`Repository "${reposId}" has found`)
            });
        }))
    }
};
