import './IconPlus.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnIconPlus = cn('IconPlus', 'Icon');

const MODS_MARGIN_RIGHT = {
    8: 8,
    12: 12,
    16: 16,
};
const MODS_MARGIN_LEFT = {
    8: 8,
};

type Mods = {
    marginR?: keyof typeof MODS_MARGIN_RIGHT;
    marginL?: keyof typeof MODS_MARGIN_LEFT;
}

interface Props {
    mods?: Mods;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default (props: Props) => {
    return <div className={classNames(cnIconPlus(props.mods || {}), props.className)}
                onClick={props.onClick}/>;
};
