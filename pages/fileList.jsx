import React from "react";
import {actionSetFiles, actionSetRepositories} from "../src/lib/store.js";
import {connect} from "react-redux";
import nextExpressPage from "next-express/page";
import App from "../src/components/App/App.jsx";
import TabList from "../src/components/TabList/TabList.jsx";
import Files from "../src/components/Files/Files.jsx";
import TableMobile from "../src/components/TableMobile/TableMobile.jsx";

const getFileList = require('../src/server/git/getFileList.js');
const getReposList = require('../src/server/getReposList.js');
const checkDirRepository = require('../src/server/checkDirRepository.js');

class FileList extends React.Component {
    static async getInitialProps(appContext, serverDataFetchFunc) {
        let props = {};
        let repositories = [];
        let files = [];
        if (typeof serverDataFetchFunc === 'function') {
            props = await serverDataFetchFunc();
            await getReposList(props.reposDir).then((result) => {
                repositories = result;
            });
            let reposPath = '';
            await checkDirRepository
                .isExist(props.reposDir, props.repositoryId)
                .then((result) => {
                    reposPath = result;
                });
            await getFileList(reposPath, props.commitHash || null, props.path || null)
                .then((result) => {
                    files = result;
                });
        }
        return {repositories, files};
    }

    constructor(props) {
        super(props);
        props.dispatch(actionSetRepositories(props.repositories));
        props.dispatch(actionSetFiles(props.files));
    }

    render() {
        return <>
            <App title={"Список файлов"}>
                <TabList active={'files'}/>
                <Files/>
                <TableMobile/>
            </App>
        </>;
    }
}

export default connect()(nextExpressPage(FileList));
