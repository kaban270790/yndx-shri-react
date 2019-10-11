import './Article.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import BreadCrumb from "../BreadCrumb/BreadCrumb.jsx";
import Branch from "../Branch/Branch";
import {useSelector} from "react-redux";

const cnArticle = cn('Article');

export default (props) => {
    const {currentRepositoryName} = useSelector((state) => {
        return {
            currentRepositoryName: state.currentRepository,
        }
    });
    return <div className={cnArticle()}>
        {currentRepositoryName ? <>
            <BreadCrumb/>
            <Branch/>
        </> : null}
        {props.children}
    </div>;
};
