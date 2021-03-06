import React from "react";
import Head from "next/head.js";
import Page from "../Page/Page.jsx"

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <>
                <Head>
                    <title>{this.props.title || ''}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </Head>
                <Page>
                    {this.props.children}
                </Page>
            </>
        );
    }
}
