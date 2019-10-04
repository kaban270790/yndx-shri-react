import React from "react";
import App from "../src/components/App/App.jsx";
import {actionTick, reducer} from "../src/lib/store.js";
import {connect} from "react-redux";
import Time from '../src/components/Time/Time.jsx';

class Index extends React.Component {
    static getInitialProps({reduxStore, req}) {
        reduxStore.dispatch(actionTick());
        return {};
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.props.actionTick();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return <Time/>;
    }
}

export default connect(null, {actionTick})(Index);
