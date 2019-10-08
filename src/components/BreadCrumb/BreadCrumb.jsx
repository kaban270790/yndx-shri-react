import './BreadCrumb.scss';
import React, {useCallback} from "react";
import {cn} from "@bem-react/classname";
import Text from "../Text/Text.tsx";
import {useDispatch, useSelector} from "react-redux";
import {actionApiRequest, actionSetCurrentPath, actionSetFiles} from "../../lib/store.js";
import Link from "next/link.js";

const cnBreadCrumb = cn('BreadCrumb');

export default (props) => {
    const {currentPath, currentRepositoryName, repositories, currentHash} = useSelector((state) => {
        return {
            currentPath: state.currentPath || '',
            currentRepositoryName: state.currentRepository,
            currentHash: state.currentHash
        }
    });
    const textMods = {
        lHeight: 20,
        size: 14,
        color: 'gray',
        underline: 'non',
        marginR: 3
    };
    let breadCrumbs = [];


    const dispatch = useDispatch();
    const openDir = useCallback(
        (repository, hash, path) => {
            dispatch(actionApiRequest(
                `/api/repos/${repository}/tree/${hash}${path}`,
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

    if (currentRepositoryName) {
        let href = `/repos/${currentRepositoryName}/tree/${currentHash}`;
        breadCrumbs.push({
            name: currentRepositoryName,
            link: `/api${href}`,
            href: href,
            repository: currentRepositoryName,
            hash: currentHash,
            path: '/',
        });
        if (typeof currentPath === 'string') {//todo почему то иногда хрень а не строка приходит :(((
            let path = '';
            currentPath.split('/')
                .filter(value => value.trim().length > 0)
                .forEach(dir => {
                    path += (`/${dir}`);
                    breadCrumbs.push({
                        name: dir,
                        link: `/api${href}/${path}`,
                        href: `${href}/${path}`,
                        repository: currentRepositoryName,
                        hash: currentHash,
                        path: path,
                    })
                });
        }
    }
    return <div className={cnBreadCrumb({borderB: true})}>
        {breadCrumbs.length > 0 ? breadCrumbs.map((crumb, index) => {
            const isLast = (index + 1) === breadCrumbs.length;
            if (isLast) {
                return <Text key={`${index}_text`}
                             tag={'span'}
                             mods={{...textMods, color: 'black', width: 'bold'}}
                >{crumb.name}</Text>
            } else {
                return (<>
                    <Link href={`/fileList`} as={crumb.href}>
                        <Text key={`${index}_text`}
                              tag={'span'}
                              onClick={openDir.bind(this, crumb.repository, crumb.hash, crumb.path)}
                              mods={{
                                  ...textMods, ...(isLast ? {
                                      color: 'black',
                                      width: 'bold',
                                  } : {
                                      cursor: 'pointer'
                                  })
                              }}
                        >{crumb.name}</Text>
                    </Link>
                    <Text key={`${index}_separator`} mods={textMods}>&nbsp;/&nbsp;</Text>
                </>)
            }
        }) : null}
    </div>;
};
