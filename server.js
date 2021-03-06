const express = require("express");
const next = require("next");
const {argv} = require('yargs');
const fs = require('fs');
const {resolve: pathResolve} = require('path');
const routes = require('./src/server/routes.json');
const getReposList = require('./src/server/getReposList.js');
const getFileList = require('./src/server/git/getFileList.js');
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

        server.pageRoute({
            method: 'get',
            path: "/",
            renderPath: "/index",

            async getProps(req, res) {
                return {reposDir};
            }
        });
        server.pageRoute({
            method: 'get',
            path: ['/repos/:repositoryId', '/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?'],
            renderPath: "/fileList",

            async getProps(req, res) {
                return {
                    reposDir,
                    repositoryId: req.params.repositoryId,
                    commitHash: req.params.commitHash,
                    path: req.params.path
                };
            }
        });

        server.get(routes.reposList, (req, res) => {
            getReposList(reposDir).then(repositories => {
                res.json({repositories});
            }).catch(error => {
                res.status(400).end({error});
            });
        });

        server.get([routes.filesList, routes.filesListRoot], (req, res) => {
            checkDirRepository.isExist(reposDir, req.params.repositoryId)
                .then(reposPath => getFileList(reposPath, req.params.commitHash || null, req.params.path || null))
                .then(files => {
                    res.json({files});
                })
                .catch(error => {
                    res.status(400).json({error});
                });
        });

        return server.listen(env.SERVER_PORT);
    })
    .then(() => console.log(`> Running on http://localhost:${env.SERVER_PORT}`))
    .catch(err => {
        console.error(`Server failed to start: ${err.stack}`);
        process.exit(1);
    });
