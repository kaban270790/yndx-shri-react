import './BreadCrumb.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Text from "../Text/Text.jsx";

const cnBreadCrumb = cn('BreadCrumb');

export default (props) => {
    const listCrumbs = [//todo получать будем
        {
            name: 'arcadia',
            link: '#',
        },
        {
            name: 'trunk',
            link: '#',
        },
        {
            name: 'arcadia',
            link: '#',
        },
        {
            name: 'arcanum',
            link: '#',
        }
    ];
    const textMods = {
        lHeight: 20,
        size: 14,
        color: 'gray',
        underline: 'non',
        marginR: 3
    };
    return <div className={cnBreadCrumb({borderB: true})}>
        {listCrumbs.map((crumb, index) => {
            const isLast = (index + 1) === listCrumbs.length;
            return (<>
                <Text tag={isLast ? 'span' : 'a'}
                      href={crumb.link}
                      mods={{...textMods, ...(isLast ? {color: 'black', width: 'bold'} : {})}}
                >{crumb.name}</Text>
                {isLast ? null : <Text mods={textMods}>&nbsp;/&nbsp;</Text>}
            </>);
        })}
    </div>;
};
