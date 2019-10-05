import './Article.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import BreadCrumb from "../BreadCrumb/BreadCrumb.jsx";
import Branch from "../Branch/Branch.jsx";

const cnArticle = cn('Article');

export default (props) => {
    return <div className={cnArticle()}>
        <BreadCrumb/>
        <Branch/>
        {props.children}
    </div>;
};
