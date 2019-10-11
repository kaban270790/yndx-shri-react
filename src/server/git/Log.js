const {execFile} = require('child_process');

/**
 * @param {string} reposDir
 * @param {{pageLimit?:number, page?:number, hash?:string, path?:string}}params
 * @returns {Promise<{}>}
 */
module.exports = (reposDir, params) => {
    params = params || {};
    return (new Promise((resolve, reject) => {
        const commitDelimiter = '-----';
        const format = [commitDelimiter, '%H', '%cn', '%at', '%s'].join('%n');
        let options = [
            'log',
            `--format=${format}`,
        ];
        if (params.pageLimit > 0) {
            options.push(`-${params.pageLimit}`);
        }
        if (params.page > 0) {
            options.push(`--skip=${(params.page - 1) * params.pageLimit}`);
        }
        if (params.hash) {
            options.push(params.hash);
        }
        if (params.path) {
            options.push(params.path);
        }

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
                    let committer = commitData.shift();
                    let timestamp = (commitData.shift())*1000;
                    let source = commitData.join("/n");
                    return {hash, committer, timestamp, source};
                });
            resolve(commits);
        });
    }));
};
