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
            const clearPath = function (path) {
                if (path) {
                    let pathRegExp = new RegExp(`${path}/`, 'g');
                    path.replace(pathRegExp, '')
                }
                return path;
            };
            let fileList = data.split("\n")
                .filter(value => value.trim().length > 0).map(str => {
                    let fileData = str.split(' ');
                    let ext = fileData[1] === 'tree' ? 'folder' : 'text';
                    fileData = fileData[2].split("\t");
                    let hash = fileData.shift();
                    return {
                        ext: ext,
                        name: clearPath(fileData.join(' ')),
                        lastCommit: {
                            ts: Date.now(),
                            hash: hash,
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
