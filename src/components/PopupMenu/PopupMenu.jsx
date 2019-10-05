import './PopupMenu.scss';
import React from "react";
import {cn} from "@bem-react/classname";

const cnPopupMenu = cn('PopupMenu');
export default (props) => {
    return <div id={props.popupName} className={cnPopupMenu()}>
        <a href="#" className={cnPopupMenu('Overlay')}/>
        <div className={props.className}>
            <div className={cnPopupMenu('SlideButton')}/>
            {props.children}
        </div>
    </div>;
};
