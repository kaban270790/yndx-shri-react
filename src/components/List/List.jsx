import './List.scss';
import React from "react";
import {cn} from "@bem-react/classname";

const cnList = cn('List');

export default (props) => {
    return <div className={cnList({indentH: 22, indent: 6})}>
        {props.children}
    </div>;
};
