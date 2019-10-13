import './IconPlus.scss';
import React, {ReactNode} from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnIconPlus = cn('IconPlus', 'Text');

const MODS_ALIGN = {
    left: 'left',
    center: 'center',
};

type Mods = {
    align?: keyof typeof MODS_ALIGN;
}

interface Props {
    mods?: Mods;
    className?: string;
    children?: ReactNode;
}

export default (props: Props) => {
    return <div className={classNames(cnIconPlus(props.mods || {}), props.className)}>
        {props.children}
    </div>;
};
