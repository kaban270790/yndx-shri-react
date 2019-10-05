import './Table.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnTable = cn('Table', 'Row');

export default (props) => {
    return <tr className={classNames(cnTable(props.mods || {}), props.className)} onClick={props.onClick || null}>
        {props.children}
    </tr>;
};
