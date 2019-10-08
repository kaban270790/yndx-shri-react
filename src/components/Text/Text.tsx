import './Text.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnText = cn('Text');
const MODS_COLOR = {
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
const MODS_WIDTH = {
    bold: 'bold',
    normal: 'normal',
    lighter: 'lighter',
};
const MODS_SIZE = {
    12: 12,
    13: 13,
    14: 14,
    16: 16,
    24: 24,
};
const MODS_LINE_HEIGHT = {
    13: 13,
    15: 15,
    18: 18,
    20: 20,
    28: 28,
};
const MOD_MARGIN_RIGHT = {
    3: 3,
    8: 8,
    16: 16,
    24: 24,
};
const MOD_UNDERLINE = {
    non: 'non',
};
const MOD_TRANSFORM = {
    uppercase: 'uppercase',
};
const MOD_WHITE_SPACE = {
    preWrap: 'preWrap',
};

export const TAG = {
    a: 'a',
    span: 'span',
    div: 'div',
};

export type Mods = {
    size?: keyof typeof MODS_SIZE;
    lHeight?: keyof typeof MODS_LINE_HEIGHT;
    width?: keyof typeof MODS_WIDTH;
    marginR?: keyof typeof MOD_MARGIN_RIGHT;
    color?: keyof typeof MODS_COLOR;
    underline?: keyof typeof MOD_UNDERLINE;
    transform?: keyof typeof MOD_TRANSFORM;
    whiteSpace?: keyof typeof MOD_WHITE_SPACE;
}

interface Props {
    elem?: 'FirstSymbol';
    mods?: Mods;
    className?: string | undefined;
    href?: string | undefined;
    tag?: keyof typeof TAG;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => void;
}

export default (props: Props) => {
    let className = classNames(
        (props.className || undefined),
        props.elem ? cnText(props.elem) : undefined,
        props.mods ? cnText(props.mods) : undefined,
    );

    switch (props.tag) {
        case TAG.a:
            return <a href={props.href} className={className} onClick={props.onClick || undefined}>
                {props.children}
            </a>;
        case TAG.span:
            return <span className={className} onClick={props.onClick || undefined}>
                {props.children}
            </span>;
        case TAG.div:
        default:
            return <div className={className} onClick={props.onClick || undefined}>
                {props.children}
            </div>;
    }
};
