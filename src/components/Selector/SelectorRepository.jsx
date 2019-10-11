import './Selector.scss';
import './../PopupMenu/PopupMenu.scss';
import './../List/List.scss';
import React, {useCallback} from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";
import PopupMenu from "../PopupMenu/PopupMenu.jsx";
import List from "../List/List.jsx";
import {useSelector, useDispatch} from "react-redux";
import Text from "../Text/Text.jsx";
import {
    actionApiRequest, actionSetCurrentHash,
    actionSetCurrentRepository,
    actionSetFiles
} from "../../lib/store.js";
import Link from "next/link";
import {useRouter} from "next/router";

const cnSelector = cn('Selector');
const cnPopupMenu = cn('PopupMenu');
const cnList = cn('List');

export default (props) => {
    const {repositories, currentRepositoryName, breadCrumbs} = useSelector((state) => {
        return {
            repositories: state.repositories || {},
            currentRepositoryName: state.currentRepository,
            breadCrumbs: state.breadCrumbs
        }
    });
    const dispatch = useDispatch();
    const changeRepository = useCallback(
        (name) => {
            dispatch(actionSetCurrentRepository(name));
            let commit = {};
            repositories.forEach((repository) => {//todo переделать что бы хранить активный репозиторий как он есть в стэйте или метод для получения этого
                if (repository.name === currentRepositoryName) {
                    commit = repository.lastCommit;
                }
            });
            dispatch(actionSetCurrentHash(commit.hash));
            dispatch(actionSetFiles({files: []}));
            dispatch(actionApiRequest(
                `/api/repos/${name}`,
                {
                    method: 'GET',
                    mode: 'cors'
                },
                actionSetFiles
            ));
        },
        [dispatch]
    );
    const router = useRouter();
    const popupName = 'menu-repositories';
    return <div className={classNames(props.className, cnSelector())}>
        <PopupMenu className={cnPopupMenu('Modal', {width: 'topMenu'})} popupName={popupName}>
            <List mods={{indentH: 22, indent: 6}}>
                {repositories.length > 0 ? repositories.map((repos, index) =>
                    <Link href={`/fileList`} as={`/repos/${repos.name}`}
                          key={index}>
                        <Text tag={'span'} onClick={changeRepository.bind(this, repos.name)}
                              className={cnList('Item', {indentV: 8})}
                              mods={{color: 'black', size: 14, lHeight: 20, underline: 'non'}}
                        >{repos.name}</Text>
                    </Link>
                ) : null}
            </List>
        </PopupMenu>
        <a href={'#' + popupName} className={cnSelector('Content', {borderB: true})}>
            <div className={cnSelector('Text')}>
                <Text tag={"span"} mods={{
                    color: 'black',
                    marginR: 3,
                    size: 14,
                    lHeight: 18,
                    width: 'bold'
                }}>Repository</Text>
                <Text tag={"span"}
                      mods={{color: 'black', size: 14, lHeight: 18}}
                >{currentRepositoryName}</Text>
            </div>
        </a>
        <div className={cnSelector('Arrow', {color: 'black'})}/>
    </div>;
};
