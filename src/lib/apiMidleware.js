const middleware = store => next => action => {
    if (action.type === 'API_REQUEST') {
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
