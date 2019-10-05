import './Header.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Logo from "../Logo/Logo.jsx";
import SelectorRepository from "../Selector/SelectorRepository.jsx";

const cnHeader = cn('Header');

export default (props) => {
    return <div className={cnHeader()}>
        <Logo className={cnHeader('Logo')}/>
        <SelectorRepository className={cnHeader('RepositorySelector')}/>
    </div>;
};
