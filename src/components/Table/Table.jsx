import './Table.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnTable = cn('Table');

export default (props) => {
    return <table className={classNames(cnTable(props.mods || {}), props.className)}>
        {props.children}
    </table>;
};
