import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {
    time: null,
    repositories: {},
};
export const types = {
    INIT: '@@init',
    TICK: 'TICK',
    TIME_CREATE: 'TIME_CREATE',
    SET_REPOSITORIES: 'SET_REPOSITORIES'
};
/**
 * @param {*} state
 * @param {{type:string}, *} action
 */
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TICK:
        case types.TIME_CREATE:
            return Object.assign({}, state, {
                time: action.time,
            });
        case types.SET_REPOSITORIES:
            return Object.assign({}, state, {
                repositories: action.repositories
            });
        default:
            return state;
    }
};

export const actionTick = () => {
    return {
        type: types.TICK,
        time: Date.now()
    };
};
export const actionSetRepositories = (repositories) => {
    return {
        type: types.SET_REPOSITORIES,
        repositories
    };
};

export const actionInitStore = () => {
    return {
        type: types.INIT
    };
};

export function initializeStore(state = initialState) {
    return createStore(reducer, state, composeWithDevTools(applyMiddleware()))
}
