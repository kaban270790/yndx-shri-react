import App from "next/app.js";
import {Provider} from "react-redux";
import React from "react";
import withReduxStore from '../src/lib/with-redux-store.js';

class ArcApp extends App {
    render() {
        const {Component, props, reduxStore} = this.props;
        return (
            <Provider store={reduxStore}>
                <Component {...props}/>
            </Provider>
        );
    }
}

export default withReduxStore(ArcApp);
