import './Text.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnText = cn('Text');

export default (props) => {
    let className = classNames(
        (props.className || null),
        props.elem ? cnText(props.elem) : null,
        props.mods ? cnText(props.mods) : null
    );

    switch (props.tag) {
        case 'a':
            return <a href={props.href} className={className} onClick={props.onClick || null}>
                {props.children}
            </a>;
        case 'span':
            return <span className={className} onClick={props.onClick || null}>
                {props.children}
            </span>;
        case 'div':
        default:
            return <div className={className} onClick={props.onClick || null}>
                {props.children}
            </div>;
    }
};
