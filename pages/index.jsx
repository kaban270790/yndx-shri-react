import React from "react";
import {actionSetRepositories} from "../src/lib/store";
import {connect} from "react-redux";
import nextExpressPage from "next-express/page";
import App from "../src/components/App/App";

const getReposList = require('../src/server/getReposList.js');

class Index extends React.Component {
    constructor(props) {
        super(props);
        props.dispatch(actionSetRepositories(props.repositories));
    }

    static async getInitialProps({req}, serverDataFetchFunc) {
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
