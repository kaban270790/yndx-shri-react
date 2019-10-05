const {execFile} = require('child_process');

module.exports = (reposDir, commitHash, path) => {
    let options = [
        'ls-tree',
        '--name-only',
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
            let fileList = data.split("\n")
                .filter(value => value.trim().length > 0);
            if (path) {
                let pathRegExp = new RegExp(`${path}/`, 'g');
                fileList = fileList.map(value => value.replace(pathRegExp, ''));
            }
            resolve(
                fileList.map(value => ({
                    ext: 'folder',
                    name: value,
                    lastCommit: {
                        ts: Date.now(),
                        hash: '5jg98478jfmu84389jfw85jf89jf8hejr8e7ufjsd9o',
                        committer: 'user',
                        message: 'message'
                    },
                }))
            );
        });
    }));
};
