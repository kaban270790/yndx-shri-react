import './TableMobile.scss';
import '../List/List.scss';
import '../IconNav/IconNav.scss';
import '../IconFile/IconFile.scss';
import React, {useCallback} from "react";
import {cn} from "@bem-react/classname";
import List from "../List/List.jsx";
import ListItem from "../List/List-Item.jsx";
import IconPlus from "../IconPlus/IconPlus.jsx";
import IconPlusIcon from '../IconPlus/IconPlus-Icon.jsx';
import IconPlusText from '../IconPlus/IconPlus-Text.jsx';
import Text from "../Text/Text.tsx";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link.js";
import {actionApiRequest, actionSetCurrentPath, actionSetFiles} from "../../lib/store.js";

const cnTableMobile = cn('TableMobile');
const cnIconNav = cn('IconNav');
const cnIconFile = cn('IconFile');

export default (props) => {
    const {files, repositories, currentRepositoryName} = useSelector((state) => ({
        files: state.files || {},
        repositories: state.repositories,
        currentRepositoryName: state.currentRepository
    }));
    let commit = {};
    repositories.forEach((repository) => {//todo переделать что бы хранить активный репозиторий как он есть в стэйте или метод для получения этого
        if (repository.name === currentRepositoryName) {
            commit = repository.lastCommit;
        }
    });

    const dispatch = useDispatch();
    const openDir = useCallback(
        (repository, hash, path) => {
            dispatch(actionApiRequest(
                `/api/repos/${repository}/tree/${hash}/${path}`,
                {
                    method: 'GET',
                    mode: 'cors'
                },
                actionSetFiles
            ));
            dispatch(actionSetCurrentPath(path));
        },
        [dispatch]
    );

    return <List mods={{displayPc: 'none'}} className={cnTableMobile()}>
        {files.length > 0 ? files.map((file, index) => {
            const url = `/repos/${currentRepositoryName}/tree/${commit.hash}/${file.fullPath}`;
            const {timestamp, hash, committer, source} = file.lastCommit || {
                timestamp: null,
                hash: null,
                committer: null,
                source: null,
            };
            return <ListItem
                key={index}
                mods={{indentV: 5, borderB: 'gray'}}
            >
                <IconPlus>
                    <IconPlusText>
                        <List>
                            <ListItem mods={{indentV: 5}}>
                                <IconPlus>
                                    <IconPlusIcon
                                        mods={{marginR: 8}}
                                        className={cnIconFile({ext: file.ext})}
                                    />
                                    <IconPlusText>
                                        <Text mods={{
                                            size: 14,
                                            lHeight: 20,
                                            color: 'black',
                                            width: 'bold'
                                        }}>
                                            {file.name}
                                        </Text>
                                    </IconPlusText>
                                </IconPlus>
                            </ListItem>
                            <ListItem mods={{indentV: 5}}>
                                <Text mods={{
                                    size: 14,
                                    lHeight: 20,
                                    color: 'black'
                                }}>{source || ''}</Text>
                            </ListItem>
                            <ListItem mods={{indentV: 5}}>
                                <Text
                                    tag={'span'}
                                    mods={{
                                        size: 14,
                                        lHeight: 20,
                                        color: 'black'
                                    }}>
                                    <Text tag={'a'} href={'#'} mods={{
                                        underline: 'non',
                                        color: 'link'
                                    }}>{hash ? hash.slice(0, 6) : ''}</Text> by {committer || ''}, {timestamp ? moment(timestamp).fromNow() : ''}
                                </Text>
                            </ListItem>
                        </List>
                    </IconPlusText>
                    {file.ext === 'folder' ?
                        <Link href={`/fileList`} as={url}>
                            <IconPlusIcon
                                mods={{marginL: 8, cursor:'pointer'}}
                                onClick={openDir.bind(this, currentRepositoryName, commit.hash, file.fullPath)}
                                className={cnIconNav({arrow: 'right'})}
                            />
                        </Link> : null}
                </IconPlus>
            </ListItem>
        }) : null}
    </List>;
};
