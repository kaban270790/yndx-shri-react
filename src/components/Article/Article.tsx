import './Article.scss';
import React, {ComponentState} from "react";
import {cn} from "@bem-react/classname";
import BreadCrumb from "../BreadCrumb/BreadCrumb.jsx";
import Branch from "../Branch/Branch";
import {useSelector} from "react-redux";

const cnArticle = cn('Article');

interface Props {
    children: React.ReactNode;
}

export default (props: Props) => {
    const {currentRepositoryName} = useSelector((state: ComponentState) => {
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
