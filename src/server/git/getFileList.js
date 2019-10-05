const {execFile} = require('child_process');

module.exports = (reposDir, commitHash, path) => {
    let options = [
        'ls-tree',
        commitHash || 'HEAD'
    ];

    if (path) {
        options.push(`${path}/`);
    }
    return (new Promise((resolve, reject) => {
        execFile('git', options, {cwd: reposDir}, (err, data, errMess) => {
            if (err && errMess) {
                reject(errMess);
            }
            const clearPath = function (pathFile) {
                if (path) {
                    let pathRegExp = new RegExp(`${path}/`, 'g');
                    pathFile = pathFile.replace(pathRegExp, '');
                }
                return pathFile;
            };
            let fileList = data.split("\n")
                .filter(value => value.trim().length > 0).map(str => {
                    let fileData = str.split(' ');
                    let ext = fileData[1] === 'tree' ? 'folder' : 'text';
                    fileData = fileData.slice(2).join(' ').split("\t");
                    let pathFile = fileData[1];
                    return {
                        ext: ext,
                        name: clearPath(pathFile),
                        fullPath: pathFile,
                        lastCommit: {
                            ts: Date.now(),
                            hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                            committer: 'user',
                            message: 'message'
                        },
                    };
                }).sort((a, b) => {
                    if (a.ext === 'folder' && b !== 'folder') {
                        return -1;
                    }
                    if (a.ext !== 'folder' && b === 'folder') {
                        return 1;
                    } else
                        return 0;
                });
            resolve(fileList);
        });
    }));
};
