const getFileList = require("../../../../src/server/git/getFileList.js");
const {it, describe, beforeEach, afterEach} = require("mocha");
const {strictEqual, deepStrictEqual} = require("assert");
const sinon = require("sinon");
const childProcess = require("child_process");
describe("Получение списка файлов", function () {
    let execFile;
    let DT;
    const fakeTs = 1570365106867;
    beforeEach(() => {
        execFile = sinon.stub(childProcess, 'execFile');

        DT = sinon.stub(Date, 'now');
        DT.returns(fakeTs);
    });
    afterEach(() => {
        execFile.restore();
        DT.restore();
    });
    it("Ни одного файла", async () => {
        execFile.callsArgOnWith(3, null, null, '', null);
        let res = await getFileList('./');
        deepStrictEqual(res, []);
    });
    it("Один файл", async () => {
        let filesString = '100644 blob 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\t.gitignore';
        execFile.callsArgOnWith(3, null, null, filesString, null);
        let res = await getFileList('./');
        deepStrictEqual(res, [
            {
                ext: 'text',
                fullPath: '.gitignore',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: '.gitignore'
            }
        ]);
    });
    it("Один папка", async () => {
        let filesString = '100644 tree 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\tsrc';
        execFile.callsArgOnWith(3, null, null, filesString, null);
        let res = await getFileList('./');
        deepStrictEqual(res, [
            {
                ext: 'folder',
                fullPath: 'src',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: 'src'
            }
        ]);
    });
    it("Папка и файл", async () => {
        let filesString = '' +
            '100644 tree 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\tsrc\n' +
            '100644 blob 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\t.gitignore' +
            '';
        execFile.callsArgOnWith(3, null, null, filesString, null);
        let res = await getFileList('./');
        deepStrictEqual(res, [
            {
                ext: 'folder',
                fullPath: 'src',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: 'src'
            },
            {
                ext: 'text',
                fullPath: '.gitignore',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: '.gitignore'
            }
        ]);
    });
    it("Сортировка что бы папка была сверху", async () => {
        let filesString = '' +
            '100644 blob 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\t.gitignore\n' +
            '100644 tree 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\tsrc';
        execFile.callsArgOnWith(3, null, null, filesString, null);
        let res = await getFileList('./');
        deepStrictEqual(res, [
            {
                ext: 'folder',
                fullPath: 'src',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: 'src'
            },
            {
                ext: 'text',
                fullPath: '.gitignore',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: '.gitignore'
            }
        ]);
    });
    it("Получение из подпапки", async () => {
        let filesString = '' +
            '100644 tree 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\tsrc/lib\n' +
            '100644 blob 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\tsrc/.gitignore' +
            '';
        execFile.callsArgOnWith(3, null, null, filesString, null);
        let res = await getFileList('./', null, 'src');
        deepStrictEqual(res, [
            {
                ext: 'folder',
                fullPath: 'src/lib',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: 'lib'
            },
            {
                ext: 'text',
                fullPath: 'src/.gitignore',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: '.gitignore'
            }
        ]);
    });
    it("С указанием хэша комита", async () => {
        let filesString = '' +
            '100644 tree 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\tsrc/lib\n' +
            '100644 blob 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\tsrc/.gitignore' +
            '';
        execFile.callsArgOnWith(3, null, null, filesString, null);
        let res = await getFileList('./', '5abbbdc591dc90bb077c454c0623162ab244cf8e', 'src');
        deepStrictEqual(res, [
            {
                ext: 'folder',
                fullPath: 'src/lib',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: 'lib'
            },
            {
                ext: 'text',
                fullPath: 'src/.gitignore',
                lastCommit: {
                    committer: 'user',
                    hash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
                    message: 'message',
                    ts: fakeTs
                },
                name: '.gitignore'
            }
        ]);
    });
    it("Ошибка git #3", async () => {
        let filesString = '' +
            '100644 tree 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\tsrc/lib\n' +
            '100644 blob 634f9ffe860f588aef6bfa1351c892e5d9ed50cd\tsrc/.gitignore' +
            '';
        let error;
        execFile.callsArgOnWith(3, null, "Error message", filesString, "Error message 2");
        await getFileList('./', '5abbbdc591dc90bb077c454c0623162ab244cf8e', 'src')
            .catch(reason => {
                error = reason;
            });
        strictEqual("Error message 2", error);
    });
});
