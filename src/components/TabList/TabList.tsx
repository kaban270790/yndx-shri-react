import './TabList.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Tab from "../Tab/Tab";

const cnTabList = cn('TabList');

interface Props {
    active: string
}

type Tab = {
    name: string,
    text: string,
}

export default (props: Props) => {
    const tabs: Tab[] = [
        {
            name: 'files',
            text: 'Files'
        },
        {
            name: 'branches',
            text: 'Branches'
        }
    ];
    return <div className={cnTabList({borderB: true})}>
        {tabs.map((tab, index) => {
            return <Tab isActive={props.active === tab.name} key={index}>{tab.text}</Tab>
        })}
    </div>;
};
