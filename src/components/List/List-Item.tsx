import './List.scss';
import React from "react";
import {cn} from "@bem-react/classname";

const cnList = cn('List', 'Item');

const MODS_BORDER_BOTTOM = {
    gray: 'gray',
};

const MODS_INDENT_H = {
    12: 12,
};

const MODS_INDENT_V = {
    5: 5,
    8: 8,
};

type Mods = {
    borderB?: keyof typeof MODS_BORDER_BOTTOM,
    indentH?: keyof typeof MODS_INDENT_H,
    indentV?: keyof typeof MODS_INDENT_V
}

interface Props {
    mods?: Mods;
    children: React.ReactNode;
}

export default (props: Props) => {
    return <div className={cnList(props.mods || {})}>
        {props.children}
    </div>;
};
