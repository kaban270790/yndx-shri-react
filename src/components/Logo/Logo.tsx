import './Logo.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnLogo = cn('Logo');

interface Props {
    className?: string
}

export default (props: Props) => {
    return <div className={classNames(props.className, cnLogo())}/>;
};
