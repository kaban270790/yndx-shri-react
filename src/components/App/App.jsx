import React from "react";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        return (<div>{this.props.name}</div>);
    }
}
