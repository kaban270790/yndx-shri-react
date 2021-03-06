import './List.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnList = cn('List');

export default (props) => {
    return <div className={classNames(cnList(props.mods || {}), props.className)}>
        {props.children}
    </div>;
};
