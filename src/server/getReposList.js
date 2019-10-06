const fs = require("fs");
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
    });
};
