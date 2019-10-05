import './BreadCrumb.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Text from "../Text/Text.jsx";
import {useSelector} from "react-redux";

const cnBreadCrumb = cn('BreadCrumb');

export default (props) => {
    const {breadCrumbs} = useSelector((state) => {
        return {
            breadCrumbs: state.breadCrumbs || [],
        }
    });
    const textMods = {
        lHeight: 20,
        size: 14,
        color: 'gray',
        underline: 'non',
        marginR: 3
    };
    return <div className={cnBreadCrumb({borderB: true})}>
        {breadCrumbs.length > 0 ? breadCrumbs.map((crumb, index) => {
            const isLast = (index + 1) === breadCrumbs.length;
            return (<>
                <Text key={`${index}_text`}
                      tag={isLast ? 'span' : 'a'}
                      href={crumb.link}
                      mods={{...textMods, ...(isLast ? {color: 'black', width: 'bold'} : {})}}
                >{crumb.name}</Text>
                {isLast ? null : <Text key={`${index}_separator`} mods={textMods}>&nbsp;/&nbsp;</Text>}
            </>);
        }) : null}
    </div>;
};
