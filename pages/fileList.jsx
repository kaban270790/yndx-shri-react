import React from "react";
import {actionSetCurrentRepository, actionSetFiles, actionSetRepositories} from "../src/lib/store.js";
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
            if (appContext.req) {
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
            } else {
                {
                    const res = await fetch(`/api/repos`, {
                        method: 'GET',
                        mode: 'cors'
                    });
                    let resJson = await res.json();
                    repositories = resJson.repositories;
                }
                {
                    const res = await fetch(`/api/repos/${props.repositoryId}`, {
                        method: 'GET',
                        mode: 'cors'
                    });
                    let resJson = await res.json();
                    files = resJson.files;
                }
            }
        }
        return {repositories, files, repositoryName: props.repositoryId};
    }

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.props.dispatch(actionSetRepositories(this.props.repositories));
        this.props.dispatch(actionSetFiles({files: this.props.files}));
        this.props.dispatch(actionSetCurrentRepository(this.props.repositoryName));
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
