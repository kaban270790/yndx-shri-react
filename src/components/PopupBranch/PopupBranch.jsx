import './PopupBranch.scss';
import '../PopupMenu/PopupMenu.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";

const cnPopupBranch = cn('PopupBranch');
const cnPopupMenu = cn('PopupMenu');
export default (props) => {
    return <div id={props.popupName} className={cnPopupMenu()}>
        <a href="#" className={cnPopupMenu('Overlay')}/>
        <div className={classNames(props.className, cnPopupBranch())}>
            <div className={cnPopupMenu('SlideButton')}/>
            {props.children}
        </div>
    </div>;
};
