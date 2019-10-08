import './Text.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnText = cn('Text');
export const MODS_COLOR = {
    black: 'black',
    gray: 'gray',
    lightGray: 'lightGray',
    darkGray: 'darkGray',
    link: 'link',
    smokyWhite: 'smokyWhite',
    blueGray: 'blueGray',
    cntAdd: 'cntAdd',
    cntRemove: 'cntRemove'
};
export const MODS_WIDTH = {
    bold: 'bold',
    normal: 'normal',
    lighter: 'lighter',
};
export const MODS_SIZE = {
    12: 12,
    13: 13,
    14: 14,
    16: 16,
    24: 24,
};
export const MODS_LINE_HEIGHT= {
    13: 13,
    15: 15,
    18: 18,
    20: 20,
    28: 28,
};
export const MOD_MARGIN_RIGHT= {
    3: 3,
    8: 8,
    16: 16,
    24: 24,
};

export const TAG = {
    a: 'a',
    span: 'span',
    div: 'div',
};

type Mods = {
    size: keyof typeof MODS_SIZE;
    lHeight: keyof typeof MODS_LINE_HEIGHT;
    width: keyof typeof MODS_WIDTH;
    marginR: keyof typeof MOD_MARGIN_RIGHT;
    color: keyof typeof MODS_COLOR;
    underline: 'non';
    transform: 'uppercase';
    whiteSpace: 'preWrap';
}

interface Props {
    elem?: 'FirstSymbol';
    mods?: Mods;
    className?: string | undefined;
    href?: string | undefined;
    tag?: keyof typeof TAG;
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => void;
}

export default (props: Props) => {
    let className = classNames(
        (props.className || undefined),
        props.elem ? cnText(props.elem) : undefined,
        props.mods ? cnText(props.mods) : undefined,
    );

    switch (props.tag) {
        case TAG.a:
            return <a href={props.href} className={className} onClick={props.onClick || null}>
                {props.children}
            </a>;
        case TAG.span:
            return <span className={className} onClick={props.onClick || null}>
                {props.children}
            </span>;
        case TAG.div:
        default:
            return <div className={className} onClick={props.onClick || null}>
                {props.children}
            </div>;
    }
};
