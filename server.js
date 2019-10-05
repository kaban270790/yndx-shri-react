const express = require("express");
const next = require("next");
const {argv} = require('yargs');
const fs = require('fs');
const {resolve: pathResolve} = require('path');
const bodyParser = require('body-parser');
const routes = require('./src/server/routes.json');
const getCommits = require('./src/server/git/getCommit.js');
const getDiff = require('./src/server/git/getDiff.js');
const getReposList = require('./src/server/getReposList.js');
const getFileList = require('./src/server/git/getFileList.js');
const getFileBlob = require('./src/server/git/getFileBlob.js');
const gitClone = require('./src/server/git/clone.js');
const removeRepos = require('./src/server/removeRepos.js');
const env = require('./src/server/env.js');
const checkDirRepository = require('./src/server/checkDirRepository.js');

if (!argv.path || argv.path.length === 0) {
    throw new Error("Empty require argument 'path'");
}

const app = next({
    dev: process.env.NODE_ENV !== "production"
});

const nextExpress = require("next-express/server")(app).injectInto(express);

app.prepare()
    .then(() => {
        return new Promise((resolve, reject) => {
            const reposDir = pathResolve(__dirname, argv.path);
            fs.stat(reposDir, ((errReposDir, stats) => {
                if (errReposDir) {
                    reject(errReposDir.message)
                }
                if (!stats.isDirectory()) {
                    reject(`Path ${reposDir} incorrect`);
                }
                resolve(reposDir);
            }));
        });
    })
    .then((reposDir) => {
        const server = nextExpress();
        // server.use(express.static('.next'));
        server.pageRoute({
            path: "/",
            renderPath: "/index",

            async getProps(req, res) {
                let repositories = {r: 1};
                await getReposList(reposDir).then((result) => {
                    repositories = result;
                });
                return {repositories};
            }
        });

        return server.listen(env.SERVER_PORT);
    })
    .then(() => console.log(`> Running on http://localhost:${env.SERVER_PORT}`))
    .catch(err => {
        console.error(`Server failed to start: ${err.stack}`);
        process.exit(1);
    });
