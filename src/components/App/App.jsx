import React from "react";
import style from "./App.scss";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    getInitialProps() {
        return {};
    }

    render() {
        return (<div className={style.text}>{this.props.name}</div>);
    }
}
