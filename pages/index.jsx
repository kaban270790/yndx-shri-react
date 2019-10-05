import React from "react";
import {actionTick} from "../src/lib/store.js";
import {connect} from "react-redux";
import Time from '../src/components/Time/Time.jsx';
import nextExpressPage from "next-express/page";

class Index extends React.Component {

    constructor(props) {
        super(props);
        console.log('index constructor', props);
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.props.dispatch(actionTick());
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        console.log('render', this.props);
        return <>
            <div>Timers</div>
            <Time/>
            {this.props.repositories ? this.props.repositories.map(function (name) {
                return <Time key={name}/>
            }) : null}
        </>;
    }
}

export default connect()(nextExpressPage(Index));
