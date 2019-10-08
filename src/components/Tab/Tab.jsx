import './Tab.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";
import Text from "../Text/Text.jsx";

const cnTab = cn('Tab');

export default (props) => {
    const clickHandler = () => {
        if (props.isActive && alert) {
            alert('Функционал в разработке');
        }
    };
    return <div
        onClick={clickHandler}
        className={classNames(cnTab(), cnTab((props.isActive ? 'Active' : 'Clickable')))}>
        <Text mods={{
            size: 16,
            color: props.isActive ? 'black' : 'gray',
            lHeight: 20,
            transform: 'uppercase'
        }}>
            {props.children}
        </Text>
    </div>;
};
