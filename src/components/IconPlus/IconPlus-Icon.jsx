import './IconPlus.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnIconPlus = cn('IconPlus', 'Icon');

export default (props) => {
    return <div className={classNames(cnIconPlus(props.mods || {}), props.className)}
                onClick={props.onClick || null}/>;
};
