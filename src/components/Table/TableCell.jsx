import './Table.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnTable = cn('Table', 'Cell');

export default (props) => {
    let className = classNames(cnTable(props.mods || {}), props.className);
    switch (props.tag) {
        case 'th':
            return <th className={className}>{props.children}</th>;
        case 'td':
        default:
            return <td className={className}>{props.children}</td>;

    }
};
