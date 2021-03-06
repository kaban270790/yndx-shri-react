import './List.scss';
import React from "react";
import {cn} from "@bem-react/classname";

const cnList = cn('List', 'Item');

export default (props) => {
    return <div className={cnList(props.mods || {})}>
        {props.children}
    </div>;
};
