import './IconPlus.scss';
import React from "react";
import {cn} from "@bem-react/classname";

const cnIconPlus = cn('IconPlus');

export default (props) => {
    return <div className={cnIconPlus(props.mods || {})}>
        {props.children}
    </div>;
};
