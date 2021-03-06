import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import apiMidleware from "./apiMidleware.js";

const initialState = {
    repositories: [],
    files: [],
    currentRepository: '',
    url: '',
    currentHash: '',
    currentPath: ''
};
export const types = {
    INIT: '@@init',
    TIME_CREATE: 'TIME_CREATE',
    SET_REPOSITORIES: 'SET_REPOSITORIES',
    SET_FILES: 'SET_FILES',
    SET_CURRENT_REPOSITORY: 'SET_CURRENT_REPOSITORY',
    SET_CURRENT_HASH: 'SET_CURRENT_HASH',
    API_REQUEST: 'API_REQUEST',
    SET_CURRENT_PATH: 'SET_CURRENT_PATH',
};
/**
 * @param {*} state
 * @param {{type:string}, *} action
 */
export const reducer = (state = initialState, action) => {
    switch (action.type) {
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
                currentRepository: action.currentRepository,
            });
        case types.SET_CURRENT_HASH:
            return Object.assign({}, state, {
                currentHash: action.hash,
            });
        case types.SET_CURRENT_PATH:
            return Object.assign({}, state, {
                currentPath: action.path
            });
        default:
            return state;
    }
};

export const actionSetRepositories = (repositories) => {
    return {
        type: types.SET_REPOSITORIES,
        repositories
    };
};
export const actionSetFiles = ({files}) => {
    return {
        type: types.SET_FILES,
        files
    };
};
export const actionSetCurrentRepository = (repository) => {
    return {
        type: types.SET_CURRENT_REPOSITORY,
        currentRepository: repository,
    };
};
export const actionSetCurrentHash = (hash) => {
    return {
        type: types.SET_CURRENT_HASH,
        hash,
    };
};
export const actionApiRequest = (href, params, subAction) => {
    return {
        type: types.API_REQUEST, href, params, subAction
    }
};
export const actionSetCurrentPath = (path) => {
    return {
        type: types.SET_CURRENT_PATH, path
    }
};

export const actionInitStore = () => {
    return {
        type: types.INIT
    };
};

export function initializeStore(state = initialState) {
    return createStore(reducer, state, composeWithDevTools(applyMiddleware(apiMidleware)))
}
