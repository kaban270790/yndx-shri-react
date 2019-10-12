import './Page.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Article from "../Article/Article";

const cnPage = cn('Page');

interface Props {
    children: React.ReactNode;
}

export default (props: Props) => {
    return <div className={cnPage()}>
        <Header/>
        <Article>
            {props.children}
        </Article>
        <Footer/>
    </div>;
};
