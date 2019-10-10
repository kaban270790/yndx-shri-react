import './List.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnList = cn('List');

const MODS_DISPLAY_PC = {
    none: 'none'
};

const MODS_INDENT_H = {
    12: 12,
    22: 22
};

const MODS_INDENT_V = {
    6: 6,
};

type Mods = {
    displayPx?: keyof typeof MODS_DISPLAY_PC,
    indentH?: keyof typeof MODS_INDENT_H,
    indentV?: keyof typeof MODS_INDENT_V
}

interface Props {
    className?: string;
    mods?: Mods;
    children: React.ReactNode;
}

export default (props: Props) => {
    return <div className={classNames(cnList(props.mods || {}), props.className)}>
        {props.children}
    </div>;
};
