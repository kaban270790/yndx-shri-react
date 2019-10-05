const {execFile, execFileSync} = require('child_process');
/**
 *
 * @param {string} reposDir
 * @param {string} commitHash
 * @returns {Promise}
 */
module.exports = (reposDir, commitHash) => {
    let options = [
        commitHash,
        '--raw'
    ];
    options.unshift('diff');
    return (new Promise((resolve, reject) => {
        execFile('git', options, {cwd: reposDir}, (err, data, errMess) => {
            if (err && errMess) {
                reject(errMess);
            }
            let diffFiles = data.split("\n")
                .reduce((previousValue, currentValue) => {
                    currentValue = currentValue.trim();
                    if (currentValue.length === 0) {
                        return previousValue;
                    }
                    let valueSplit = currentValue.split("\t");
                    let diffData = {
                        mode: valueSplit[0].split(' ').pop()[0],
                        filePath: valueSplit[1],
                        diff: getDiffByPath(reposDir,commitHash,valueSplit[1]),
                    };
                    if (diffData.mode === 'R') {
                        diffData.filePathOld = valueSplit[2];
                    }
                    previousValue[valueSplit[1]] = diffData;
                    return previousValue;
                }, {});
            resolve(diffFiles);
        });
    }));
};
const getDiffByPath = (reposDir, commitHash, path) => {
    let options = [
        commitHash,
        '--unified=0',
        path
    ];
    options.unshift('diff');
    return execFileSync('git', options, {cwd: reposDir}).toString();
};
