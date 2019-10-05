import './Table.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnTable = cn('Table', 'Head');

export default (props) => {
    return <thead className={classNames(cnTable(props.mods || {}), props.className)}>
    {props.children}
    </thead>;
};
