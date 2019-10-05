import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {
    time: null,
    repositories: [],
    files: [],
    currentRepository: '',
    url: '',
    breadCrumbs: []
};
export const types = {
    INIT: '@@init',
    TICK: 'TICK',
    TIME_CREATE: 'TIME_CREATE',
    SET_REPOSITORIES: 'SET_REPOSITORIES',
    SET_FILES: 'SET_FILES',
    SET_CURRENT_REPOSITORY: 'SET_CURRENT_REPOSITORY'
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
        case types.SET_FILES:
            return Object.assign({}, state, {
                files: action.files
            });
        case types.SET_CURRENT_REPOSITORY:
            return Object.assign({}, state, {
                url: action.url,
                currentRepository: action.currentRepository,
                breadCrumbs: action.breadCrumbs
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
export const actionSetFiles = (files) => {
    return {
        type: types.SET_FILES,
        files
    };
};
export const actionSetCurrentRepository = (repository) => {
    let url = `/repos/${repository}`;
    return {
        type: types.SET_CURRENT_REPOSITORY,
        currentRepository: repository,
        url: url,
        breadCrumbs: [
            {
                name: repository,
                link: url
            }
        ]
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
