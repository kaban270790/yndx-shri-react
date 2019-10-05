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
        str = str.replace(new RegExp('class="([a-z0-9\-_\\s]{1,})"', 'g'), function (match, classList) {
            classList = classList.split(" ").map((cls) => {
                let block, elem, mod, val, parts;
                if (/__[\w\d]/.test(cls)) {
                    parts = cls.split('__');
                    block = parts[0];
                    parts = parts[1].split('_');
                    elem = parts[0] || null;
                } else {
                    parts = cls.split('_');
                    block = parts[0];
                }
                mod = parts[1] || null;
                val = parts[2] || null;
                const toUpper = function (str, firstToUp) {
                    if (str && str.length > 0) {
                        return str.split('-').map((value, index) => {
                            if ((firstToUp && index === 0) || index > 0) {
                                value = value.replace(/^\w/, substring => substring.toLocaleUpperCase());
                            }
                            return value;
                        }).join('');
                    }
                    return null;
                };
                let newVar = [
                    toUpper(block, true),
                    toUpper(elem, true),
                    toUpper(mod, false),
                    toUpper(val, false)
                ];
                // console.log(newVar);
                return newVar.filter(value => value && value.length > 0)
                    .join('-');
            }).join(" ");
            return `class="${classList}"`;
        });
        return str;
    }).join("\n");

    return data;
}

readDir(pathDir);
