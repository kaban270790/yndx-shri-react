import './IconPlus.scss';
import React, {ReactNode} from "react";
import {cn} from "@bem-react/classname";

const cnIconPlus = cn('IconPlus');

type Mods = {
}

interface Props {
    mods?: Mods;
    className?: string;
    children: ReactNode
}

export default (props: Props) => {
    return <div className={cnIconPlus(props.mods || {})}>
        {props.children}
    </div>;
};
