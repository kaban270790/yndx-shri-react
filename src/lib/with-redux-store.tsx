import React from 'react';
import {initializeStore, State} from './store';
import App from "../components/App/App";
import {Store} from "redux";
import {BaseContext} from "next/dist/next-server/lib/utils";

const isServer = typeof window === 'undefined';

function getOrCreateStore(state?: State): Store | undefined {
    if (isServer) {
        return initializeStore(state);
    }
    const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

    interface WindowX extends Window {
        __NEXT_REDUX_STORE__?: Store
    }

    const win: WindowX = window;
    if (!win[__NEXT_REDUX_STORE__]) {
        win[__NEXT_REDUX_STORE__] = initializeStore(state);
    }
    return win.__NEXT_REDUX_STORE__;
}

interface Props {
    initializeState: State
}

export default (App: typeof React.Component) => {
    return class AppWithRedux extends React.Component {
        reduxStore?: Store;

        constructor(props: Props) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initializeState);
        }

        static async getInitialProps(appContext: BaseContext) {
            const reduxStore: Store | undefined = getOrCreateStore();

            appContext.ctx.reduxStore = reduxStore;

            let props = {};
            if (typeof appContext.Component.getInitialProps === 'function') {
                props = appContext.Component.getInitialProps ? await appContext.Component.getInitialProps(appContext.ctx) : {}
            }
            props = Object.assign({}, {props}, {initializeState: reduxStore ? reduxStore.getState() : {}});
            return props;
        }

        render() {
            return <App {...this.props}
                        reduxStore={this.reduxStore}
            />;
        }
    }
};
