import React from "react";
import Head from "next/head.js";
import Page from "../Page/Page"
import {Store} from "redux";

interface Props {
    title?: string;
    children: React.ReactNode;
}

export default class App extends React.Component<Props> {

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
