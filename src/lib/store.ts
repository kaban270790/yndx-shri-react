import {ActionCreator, AnyAction, applyMiddleware, createStore, Store, StoreCreator} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import apiMiddleware from "./apiMiddleware";

export type State = {
    time?: number | null,
    repositories: Repository[],
    files: File[],
    currentRepository: string,
    currentHash: string,
    currentPath: string,
}

type Repository = {};
type File = {};

const initialState: State = {
    repositories: [],
    files: [],
    currentRepository: '',
    currentHash: '5abbbdc591dc90bb077c454c0623162ab244cf8e',
    currentPath: ''
};

export const TYPES = {
    INIT: 'INIT',
    TIME_CREATE: 'TIME_CREATE',
    SET_REPOSITORIES: 'SET_REPOSITORIES',
    SET_FILES: 'SET_FILES',
    SET_CURRENT_REPOSITORY: 'SET_CURRENT_REPOSITORY',
    API_REQUEST: 'API_REQUEST',
    SET_CURRENT_PATH: 'SET_CURRENT_PATH',
    SET_CURRENT_HASH: 'SET_CURRENT_HASH',
};

export interface Action extends AnyAction {
    type: keyof typeof TYPES
}

/**
 * @param {*} state
 * @param {{type:string}, *} action
 */
export const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case TYPES.SET_REPOSITORIES:
            return Object.assign({}, state, {
                repositories: action.repositories
            });
        case TYPES.SET_FILES:
            return Object.assign({}, state, {
                files: action.files
            });
        case TYPES.SET_CURRENT_REPOSITORY:
            return Object.assign({}, state, {
                currentRepository: action.currentRepository,
            });
        case TYPES.SET_CURRENT_PATH:
            return Object.assign({}, state, {
                currentPath: action.path
            });
        case TYPES.SET_CURRENT_HASH:
            return Object.assign({}, state, {
                currentHash: action.hash,
            });
        default:
            return state;
    }
};

export interface ActionSetRepositories extends Action {
    repositories: []
}

export const actionSetRepositories = (repositories: []): ActionSetRepositories => {
    return {
        type: "SET_REPOSITORIES",
        repositories
    };
};

export interface ActionSetFiles extends Action {
    files: []
}

export const actionSetFiles = ({files}: { files: [] }): ActionSetFiles => {
    return {
        type: 'SET_FILES',
        files
    };
};

export interface ActionSetCurrentRepository extends Action {
    currentRepository: string
}

export const actionSetCurrentRepository = (repository: string): ActionSetCurrentRepository => {
    return {
        type: 'SET_CURRENT_REPOSITORY',
        currentRepository: repository,
    };
};

export interface ActionApiRequest extends Action {
    href: string
    params: Object
    subAction: ActionCreator<Action>
}

export const actionApiRequest = (href: string, params: Object, subAction: ActionCreator<Action>): ActionApiRequest => {
    return {
        type: 'API_REQUEST', href, params, subAction
    }
};

export interface ActionSetCurrentHash extends Action {
    hash: string
}

export const actionSetCurrentHash = (hash: string): ActionSetCurrentHash => {
    return {
        type: 'SET_CURRENT_HASH',
        hash,
    };
};


export interface ActionSetCurrentPath extends Action {
    path: string
}

export const actionSetCurrentPath = (path: string): ActionSetCurrentPath => {
    return {
        type: 'SET_CURRENT_PATH', path
    }
};

export const actionInitStore = (): Action => {
    return {
        type: 'INIT'
    };
};

export function initializeStore(state = initialState): Store {
    return createStore(reducer, state, composeWithDevTools(applyMiddleware(apiMiddleware)))
}
