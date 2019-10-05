const fs = require("fs");
const {argv} = require('yargs');
const {resolve: pathResolve} = require('path');

if (!argv.path || argv.path.length === 0) {
    throw new Error("Empty require argument 'path'");
}
const pathDir = pathResolve(__dirname, argv.path);
const readDir = function (dir) {
    fs.readdir(dir, {withFileTypes: true}, ((errReposDir, files) => {
        if (errReposDir) {
            console.error(errReposDir.message);
            process.exit();
        }
        files.map((fileStat) => {
            if (fileStat.isDirectory()) {
                readDir(pathResolve(dir, fileStat.name));
            } else if (fileStat.isFile()) {
                let file = pathResolve(dir, fileStat.name);
                (new Promise(function (resolve, reject) {
                    fs.readFile(file, ((err, data) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(data);
                        }
                    ));
                })).then(value => {
                    return replace(value);
                }).then(value => {
                    return (new Promise((resolve, reject) => {
                        fs.writeFile(file, value, err => {
                            if (err) {
                                reject(err);
                            }
                            resolve(true);
                        });
                    }));
                }).catch(reason => {
                    console.error(reason);
                });
            }
        });

    }));
};

function replace(code) {
    let data = `${code}`;
    data = data.split("\n").map((str) => {
        if (/^\.[a-z]/.test(str)) {
            str = str.replace(/(^\.[a-z])|(\-[a-z])/g, function (symbol) {
                return symbol.toLocaleUpperCase().replace('-', '');
            });
        } else if (/&__[a-z]/.test(str)) {
            str = str.replace(/(&__[a-z])|(\-[a-z])/g, function (symbol) {
                return symbol.toLocaleUpperCase().replace('-', '').replace('__', '-');
            });
        } else if (/&_[a-z0-9]/.test(str)) {
            let first = true;
            str = str.replace(/(&_[a-z])|(\-[a-z])/g, function (symbol) {
                if (first === true) {
                    first = false;
                    return symbol;
                }
                return symbol.toLocaleUpperCase();
            }).replace('-', '').replace('_', '-');
        }
        return str;
    }).join("\n");

    return data;
}

readDir(pathDir);
