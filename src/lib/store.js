import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {
    time: null
};
export const types = {
    TICK: 'TICK',
    TIME_CREATE: 'TIME_CREATE'
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

export function initializeStore(state = initialState) {
    return createStore(reducer, state, composeWithDevTools(applyMiddleware()))
}
