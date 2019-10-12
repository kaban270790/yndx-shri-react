import React, {useCallback} from "react";
import {cn} from "@bem-react/classname";
import Table from "../Table/Table.jsx";
import TableTHead from "../Table/TableTHead.jsx";
import TableRow from "../Table/TableRow.jsx";
import TableCell from "../Table/TableCell.jsx";
import Text from "../Text/Text.tsx";
import TableTBody from "../Table/TableTBody.jsx";
import moment from "moment";
import IconPlus from "../IconPlus/IconPlus";
import IconPlusIcon from "../IconPlus/IconPlus-Icon";
import IconPlusText from "../IconPlus/IconPlus-Text";
import '../IconFile/IconFile.scss';
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link.js";
import {actionApiRequest, actionSetCurrentPath, actionSetFiles} from "../../lib/store.js";

const cnIconFile = cn('IconFile');

const modsThText = {
    lHeight: 20,
    size: 14,
    color: 'lightGray',
    width: 'normal'
};
const modsTdText = {
    lHeight: 20,
    size: 14,
    color: 'black',
};
const modsTh = {
    borderB: 'dark',
    indentB: 8,
    indentH: 8,
    indentT: 16
};
const modsTd = {
    borderB: 'light',
    indentB: 12,
    indentH: 8,
    indentT: 18
};

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
    return (
        <Table mods={{displayTablet: 'none'}}>
            <TableTHead>
                <TableRow>
                    <TableCell tag={'th'} mods={{...modsTh, width: 2}}>
                        <Text tag={'span'} mods={modsThText}>
                            Name
                        </Text>
                    </TableCell>
                    <TableCell tag={'th'} mods={{...modsTh, width: 2}}>
                        <Text tag={'span'} mods={modsThText}>
                            Last commit
                        </Text>
                    </TableCell>
                    <TableCell tag={'th'} mods={{...modsTh, width: 4}}>
                        <Text tag={'span'} mods={modsThText}>
                            Commit message
                        </Text>
                    </TableCell>
                    <TableCell tag={'th'} mods={{...modsTh, width: 2}}>
                        <Text tag={'span'} mods={modsThText}>
                            Committer
                        </Text>
                    </TableCell>
                    <TableCell tag={'th'} mods={{...modsTh, width: 2, align: 'right'}}>
                        <Text tag={'span'} mods={modsThText}>
                            Update
                        </Text>
                    </TableCell>
                </TableRow>
            </TableTHead>
            <TableTBody>
                {files.length > 0 ? files.map((file, index) => {
                    const url = `/repos/${currentRepositoryName}/tree/${commit.hash}/${file.fullPath}`;
                    const {timestamp, hash, committer, source} = file.lastCommit || {
                        timestamp: null,
                        hash: null,
                        committer: null,
                        source: null,
                    };
                    return (
                        <TableRow key={index}>
                            <TableCell mods={{...modsTd, width: 2}}>
                                <IconPlus>
                                    <IconPlusIcon
                                        mods={{
                                            marginR: 8
                                        }}
                                        className={cnIconFile({ext: file.ext})}/>
                                </IconPlus>
                                <IconPlusText>
                                    {file.ext === 'folder' ?
                                        <Link href={`/fileList`} as={url}>
                                            <Text tag={'span'}
                                                  onClick={openDir.bind(this, currentRepositoryName, commit.hash, file.fullPath)}
                                                  mods={{
                                                      ...modsTdText,
                                                      width: 'bold',
                                                      underline: 'non',
                                                      cursor: 'pointer'
                                                  }}>{file.name}</Text>
                                        </Link> :
                                        <Text tag={'span'}
                                              mods={{
                                                  ...modsTdText,
                                                  width: 'bold',
                                                  underline: 'non'
                                              }}>{file.name}</Text>}
                                </IconPlusText>
                            </TableCell>
                            <TableCell mods={{...modsTd, width: 2}}>
                                <Text tag={'a'} href={'#'} mods={{...modsTdText, underline: 'non', color: 'link'}}>
                                    {hash ? hash.slice(0, 6) : ''}
                                </Text>
                            </TableCell>
                            <TableCell mods={{...modsTd, width: 4}}>
                                <Text tag={'span'} mods={modsTdText}>
                                    {source || ''}
                                </Text>
                            </TableCell>
                            <TableCell mods={{...modsTd, width: 2}}>
                                <Text tag={'span'} mods={modsTdText}>
                                    {committer ? <>
                                        <Text tag={"span"}
                                              elem={'FirstSymbol'}>
                                            {committer.slice(0, 1)}
                                        </Text>
                                        {committer.slice(1)}
                                    </> : null}
                                </Text>
                            </TableCell>
                            <TableCell mods={{...modsTd, width: 2, align: 'right'}}>
                                <Text tag={'span'} mods={modsTdText}>
                                    {timestamp ? moment(timestamp).fromNow() : ''}
                                </Text>
                            </TableCell>
                        </TableRow>
                    );
                }) : null}
            </TableTBody>
        </Table>);
};
