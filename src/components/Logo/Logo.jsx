import './Logo.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnLogo = cn('Logo');

export default (props) => {
    return <div className={classNames(props.className, cnLogo())}/>;
};
