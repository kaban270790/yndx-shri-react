import './Page.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Header from "../Header/Header.jsx";

const cnPage = cn('Page');

export default (props) => {
    return <div className={cnPage()}>
        <Header/>
        {props.children}
    </div>;
};
