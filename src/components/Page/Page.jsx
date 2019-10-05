import './Page.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const cnPage = cn('Page');

export default (props) => {
    return <div className={cnPage()}>
        <Header/>
        {props.children}
        <Footer/>
    </div>;
};
