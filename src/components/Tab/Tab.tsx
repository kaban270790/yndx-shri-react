import './Tab.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";
import Text, {MODS_SIZE, MODS_COLOR, MODS_LINE_HEIGHT} from "../Text/Text.tsx";

const cnTab = cn('Tab');

interface Props {
    isActive: boolean,
    children: React.ReactNode
}

export default (props: Props) => {
    const clickHandler = () => {
        if (!props.isActive && alert) {
            alert('Функционал в разработке');
        }
    };
    return <div
        onClick={clickHandler}
        className={classNames(cnTab(), cnTab((props.isActive ? 'Active' : 'Clickable')))}>
        <Text mods={{
            size: MODS_SIZE["16"],
            color: props.isActive ? MODS_COLOR.black : MODS_COLOR.gray,
            lHeight: MODS_LINE_HEIGHT["20"],
            transform: 'uppercase'
        }}>
            {props.children}
        </Text>
    </div>;
};
