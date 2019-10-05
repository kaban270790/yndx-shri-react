import './Selector.scss';
import './../Text/Text.scss';
import './../PopupMenu/PopupMenu.scss';
import './../List/List.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";
import PopupMenu from "../PopupMenu/PopupMenu.jsx";
import List from "../List/List.jsx";
import {useSelector} from "react-redux";

const cnSelector = cn('Selector');
const cnText = cn('Text');
const cnPopupMenu = cn('PopupMenu');
const cnList = cn('List');

export default (props) => {
    const {repositories} = useSelector((state) => {
        console.log(state);
        return {
            repositories: state.repositories || {}
        }
    });
    console.log(repositories);
    const popupName = 'menu-repositories';
    return <div className={classNames(props.className, cnSelector())}>
        <PopupMenu className={cnPopupMenu('Modal', {width: 'top-menu'})} popupName={popupName}>
            <List>
                {repositories ? repositories.map((repos, index) =>
                    <a href={repos.name}
                       key={index}
                       className={cnList('Item', {indentV: 8}, [
                           cnText({color: 'black', size: 14, lHeight: 20, underline: 'non'})
                       ])}>{repos.name}</a>
                ) : null}
            </List>
        </PopupMenu>
        <a href={'#' + popupName} className={cnSelector('Content', {borderB: true})}>
            <div className={cnSelector('Text')}>
                <span className={cnText({
                    color: 'black',
                    marginR: 3,
                    size: 14,
                    lHeight: 18,
                    width: 'bold'
                })}>Repository</span>
                <span className={cnText({color: 'black', size: 14, lHeight: 18})}>Arc</span>
            </div>
        </a>
        <div className={cnSelector('Arrow', {color: 'black'})}/>
    </div>;
};
