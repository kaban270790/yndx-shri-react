import './PopupMenu.scss';
import React, {ReactChildren} from "react";
import {cn} from "@bem-react/classname";

const cnPopupMenu = cn('PopupMenu');

interface Props {
    className?: string,
    popupName: string,
    children: ReactChildren
}

export default (props: Props) => {
    return <div id={props.popupName} className={cnPopupMenu()}>
        <a href="#" className={cnPopupMenu('Overlay')}/>
        <div className={props.className}>
            <div className={cnPopupMenu('SlideButton')}/>
            {props.children}
        </div>
    </div>;
};
