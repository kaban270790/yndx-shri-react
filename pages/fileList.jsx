import React from "react";
import {
    actionSetCurrentHash,
    actionSetCurrentPath,
    actionSetCurrentRepository,
    actionSetFiles,
    actionSetRepositories
} from "../src/lib/store.js";
import {connect} from "react-redux";
import nextExpressPage from "next-express/page";
import App from "../src/components/App/App";
import TabList from "../src/components/TabList/TabList";
import Files from "../src/components/Files/Files.jsx";
import TableMobile from "../src/components/TableMobile/TableMobile.jsx";

const getFileList = require('../src/server/git/getFileList.js');
const getReposList = require('../src/server/getReposList.js');
const checkDirRepository = require('../src/server/checkDirRepository.js');

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

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
        return {repositories, files, repositoryName: props.repositoryId, currentPath: props.path || ''};
    }

    componentDidMount() {
        this.props.dispatch(actionSetRepositories(this.props.repositories));
        this.props.dispatch(actionSetFiles({files: this.props.files}));
        this.props.dispatch(actionSetCurrentRepository(this.props.repositoryName));
        let commit = {};
        this.props.repositories.forEach((repository) => {//todo переделать что бы хранить активный репозиторий как он есть в стэйте или метод для получения этого
            if (repository.name === this.props.repositoryName) {
                commit = repository.lastCommit;
            }
        });
        this.props.dispatch(actionSetCurrentHash(commit.hash));
        this.props.dispatch(actionSetCurrentPath(this.props.currentPath));
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
