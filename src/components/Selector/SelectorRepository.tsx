import './Selector.scss';
import './../PopupMenu/PopupMenu.scss';
import './../List/List.scss';
import React, {ComponentState, useCallback} from "react";
import {cn} from "@bem-react/classname";
import {classnames as classNames} from "@bem-react/classnames";
import PopupMenu from "../PopupMenu/PopupMenu";
import List from "../List/List";
import {useDispatch, useSelector} from "react-redux";
import Text from "../Text/Text";
import {actionApiRequest, actionSetCurrentRepository, actionSetFiles, actionSetCurrentHash} from "../../lib/store";
import Link from "next/link";

const cnSelector = cn('Selector');
const cnPopupMenu = cn('PopupMenu');
const cnList = cn('List');

interface Props {
    className?: string,
}

type Repository = { //todo потом отсюда выпилить
    name: string
}

export default (props: Props) => {
    const {repositories, currentRepositoryName, breadCrumbs} = useSelector((state: ComponentState) => {
        return {
            repositories: state.repositories || {},
            currentRepositoryName: state.currentRepository,
            breadCrumbs: state.breadCrumbs
        }
    });
    const dispatch = useDispatch();
    const changeRepository = useCallback(
        (repository) => {
            console.log(repository);
            dispatch(actionSetCurrentRepository(repository.name));
            dispatch(actionSetCurrentHash(repository.lastCommit.hash));
            dispatch(actionSetFiles({files: []}));
            dispatch(actionApiRequest(
                `/api/repos/${repository.name}`,
                {
                    method: 'GET',
                    mode: 'cors'
                },
                actionSetFiles
            ));
        },
        [dispatch]
    );
    const popupName = 'menu-repositories';
    return <div className={classNames(props.className, cnSelector())}>
        <PopupMenu className={cnPopupMenu('Modal', {width: 'topMenu'})} popupName={popupName}>
            <List mods={{indentH: 22, indentV: 6}}>
                {repositories.length > 0 ? repositories.map((repos: Repository, index: number) =>
                    <Link href={`/fileList`} as={`/repos/${repos.name}`}
                          key={index}>
                        <Text tag={'span'} onClick={changeRepository.bind(null, repos)}
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
