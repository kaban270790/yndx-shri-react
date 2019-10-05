import React from "react";
import {actionTick, actionSetRepositories} from "../src/lib/store.js";
import {connect} from "react-redux";
import Time from '../src/components/Time/Time.jsx';
import nextExpressPage from "next-express/page";
import App from "../src/components/App/App.jsx";

class Index extends React.Component {
    constructor(props) {
        super(props);
        props.dispatch(actionSetRepositories(props.repositories));
    }

    componentDidMount(props) {
        // this.timer = setInterval(() => {
        //     this.props.dispatch(actionTick());
        // }, 1000);
    }

    componentWillUnmount() {
        // clearInterval(this.timer);
    }

    render() {
        return <>
            <App title={"Список файлов"}/>
        </>;
    }
}

export default connect()(nextExpressPage(Index));
