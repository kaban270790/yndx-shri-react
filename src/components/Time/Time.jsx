import React from "react";
import {useSelector, shallowEqual} from 'react-redux';

export default () => {
    const {time} = useSelector((state) => ({
        time: state.time
    }));
    return <div>{(new Date(time).toJSON())}</div>
};
