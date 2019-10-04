import React from 'react';
import {initializeStore} from './store.js';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(state) {
    if (isServer) {
        return initializeStore(state);
    }

    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initializeStore(state);
    }
    return window[__NEXT_REDUX_STORE__];
}

export default App => {
    return class AppWithRedux extends React.Component {
        static async getInitialProps (appContext) {
            const reduxStore = getOrCreateStore();

            appContext.ctx.reduxStore = reduxStore;

            let props = {};
            if (typeof App.getInitialProps === 'function') {
                props = await App.getInitialProps(appContext);
            }

            return {
                ...props,
                initializeState: reduxStore.getState()
            };
        }

        /**
         * @param {*} props
         */
        constructor(props) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initializeState);
        }

        render () {
            return <App {...this.props} reduxStore={this.reduxStore} />;
        }
    }
};
