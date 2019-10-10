import './Selector.scss';
import './../PopupMenu/PopupMenu.scss';
import './../PopupBranch/PopupBranch.scss';
import './../List/List.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";
import PopupMenu from "../PopupMenu/PopupMenu";
import List from "../List/List";
import Text from "../Text/Text.tsx";
import PopupBranch from "../PopupBranch/PopupBranch";
import moment from "moment";

const cnSelector = cn('Selector');
const cnPopupMenu = cn('PopupMenu');
const cnPopupBranch = cn('PopupBranch');
const cnList = cn('List');

export default (props) => {
    const branches = [
        {
            name: 'asdasd',
            ts: Date.now(),
        },
        {
            name: 'asdasd1',
            ts: Date.now(),
        },
        {
            name: 'asdasd2',
            ts: Date.now(),
        },
        {
            name: 'asdasd3',
            ts: Date.now(),
        }
    ];
    const curBranch = {
        name: 'curr',
        ts: Date.now(),
    };
    const popupName = 'menu-branches';
    return <div className={classNames(props.className, cnSelector())}>
        <PopupBranch className={cnPopupMenu('Modal', {width: 'branchMenu'})} popupName={popupName}>
            <div className={cnPopupBranch('Current')}>
                <Text mods={{
                    size: 14,
                    lHeight: 20,
                    width: 'bold',
                    color: 'smokyWhite'
                }}>
                    {curBranch.name}
                </Text>
                <Text mods={{
                    size: 13,
                    lHeight: 20,
                    color: 'gray'
                }}>
                    {moment(curBranch.ts).format('lll')}
                </Text>
            </div>
            <div className={cnPopupBranch('Separator')}/>
            <List>
                {branches ? branches.map((branch, index) =>
                    <div key={index}
                         className={classNames(cnList('Item', {
                             indentV: 8,
                             indentH: 12
                         }), cnPopupBranch('List', {hovering: true}))}
                    >
                        <Text mods={{
                            size: 14,
                            lHeight: 20,
                            color: 'blueGray'
                        }}>
                            {branch.name}
                        </Text>
                        <Text mods={{
                            size: 13,
                            lHeight: 20,
                            color: 'gray'
                        }}>
                            {moment(branch.ts).format('lll')}
                        </Text>
                    </div>
                ) : null}
            </List>
        </PopupBranch>
        <Text tag={"a"}
              href={'#' + popupName}
              className={cnSelector('Content')}>
            <Text tag={"span"} mods={{
                color: 'gray',
                size: 24,
                lHeight: 28
            }}>trunk</Text>
        </Text>
        <div className={cnSelector('Arrow', {color: 'gray'})}/>
    </div>;
};
