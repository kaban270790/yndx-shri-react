import React from "react";
import {actionTick, actionSetRepositories} from "../src/lib/store.js";
import {connect} from "react-redux";
import Time from '../src/components/Time/Time.jsx';
import nextExpressPage from "next-express/page";
import App from "../src/components/App/App.jsx";
import TabList from "../src/components/TabList/TabList.jsx";
import TableMobile from "../src/components/TableMobile/TableMobile.jsx";
import Files from "../src/components/Files/Files.jsx";

const getReposList = require('../src/server/getReposList.js');

class Index extends React.Component {
    constructor(props) {
        super(props);
        props.dispatch(actionSetRepositories(props.repositories));
    }

    static async getInitialProps(appContext, serverDataFetchFunc) {
        let props = {};
        if (typeof serverDataFetchFunc === 'function') {
            props = await serverDataFetchFunc();
        }
        let repositories = [];
        await getReposList(props.reposDir).then((result) => {
            repositories = result;
        });
        return {repositories};
    }

    render() {
        return <>
            <App title={"Главная страница"}>
            </App>
        </>;
    }
}

export default connect()(nextExpressPage(Index));
