import {Dispatch, Middleware, MiddlewareAPI, Store} from "redux";
import {ActionApiRequest, TYPES} from "./store";

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, Store>) => (next: Dispatch) => (action: ActionApiRequest) => {
    if (action.type === TYPES.API_REQUEST) {
        fetch(action.href, action.params)
            .then(res => res.json())
            .then(json => {
                    next(action.subAction(json))
                }
            );
    }
    next(action);
};

export default middleware;
