import './Header.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Logo from "../Logo/Logo.jsx";
import Selector from "../Selector/Selector.jsx";

const cnHeader = cn('Header');

export default (props) => {
    return <div className={cnHeader()}>
        <Logo className={cnHeader('Logo')}/>
        <Selector className={cnHeader('RepositorySelector')}/>
    </div>;
};
