const getReposList = require("../../../src/server/getReposList.js");
const {it, describe, beforeEach, afterEach} = require("mocha");
const {strictEqual, deepStrictEqual} = require("assert");
const sinon = require("sinon");
const fs = require("fs");
const StatMock = require("../StatMock.js");
describe("Чтение директорий репозитория", function () {
    let readDir;
    beforeEach(() => {
        readDir = sinon.stub(fs, 'readdir');
    });
    afterEach(() => {
        readDir.restore();
    });
    it("Пустая папка", async () => {
        readDir.callsArgOnWith(2, null, null, []);
        let res = await getReposList('../');
        deepStrictEqual(res, []);
    });
    it("Пустая только файлами", async () => {
        readDir.callsArgOnWith(2, null, null, [StatMock('readme.md', false), StatMock('.gitignore', false)]);
        let res = await getReposList('../');
        deepStrictEqual(res, []);
    });
    it("Пустая только папками", async () => {
        readDir.callsArgOnWith(2, null, null, [StatMock('repos-1', true), StatMock('repos-2', true)]);
        let res = await getReposList('../');
        deepStrictEqual(res, [{name: 'repos-1'}, {name: 'repos-2'}]);
    });
    it("Пустая папками и файлами", async () => {
        readDir.callsArgOnWith(2, null, null, [StatMock('repos-1', true), StatMock('repos-2', true), StatMock('readme.md', false), StatMock('.gitignore', false)]);
        let res = await getReposList('../');
        deepStrictEqual(res, [{name: 'repos-1'}, {name: 'repos-2'}]);
    });
    it("Пустая папками и файлами", async () => {
        let error;
        readDir.callsArgOnWith(2, null, "Error message", [StatMock('repos-1', true)]);
        await getReposList('../').catch(reason => {
            error = reason;
        });
        strictEqual("Error message", error);
    });
});
