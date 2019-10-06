import React, {useCallback} from "react";
import {cn} from "@bem-react/classname";
import Table from "../Table/Table.jsx";
import TableTHead from "../Table/TableTHead.jsx";
import TableRow from "../Table/TableRow.jsx";
import TableCell from "../Table/TableCell.jsx";
import Text from "../Text/Text.jsx";
import TableTBody from "../Table/TableTBody.jsx";
import moment from "moment";
import IconPlus from "../IconPlus/IconPlus.jsx";
import IconPlusIcon from "../IconPlus/IconPlus-Icon.jsx";
import IconPlusText from "../IconPlus/IconPlus-Text.jsx";
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
    const {files, currentRepositoryName} = useSelector((state) => ({
        files: state.files || {},
        currentRepositoryName: state.currentRepository
    }));

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
                    const url = `/repos/${currentRepositoryName}/tree/${file.lastCommit.hash}/${file.fullPath}`;
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
                                                  onClick={openDir.bind(this, currentRepositoryName, file.lastCommit.hash, file.fullPath)}
                                                  mods={{
                                                      ...modsTdText,
                                                      width: 'bold',
                                                      underline: 'non'
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
                                    {file.lastCommit.hash.slice(0, 6)}
                                </Text>
                            </TableCell>
                            <TableCell mods={{...modsTd, width: 4}}>
                                <Text tag={'span'} mods={modsTdText}>
                                    {file.lastCommit.message}
                                </Text>
                            </TableCell>
                            <TableCell mods={{...modsTd, width: 2}}>
                                <Text tag={'span'} mods={modsTdText}>
                                    <Text tag={"span"}
                                          elem={'FirstSymbol'}>
                                        {file.lastCommit.committer.slice(0, 1)}
                                    </Text>
                                    {file.lastCommit.committer.slice(1)}
                                </Text>
                            </TableCell>
                            <TableCell mods={{...modsTd, width: 2, align: 'right'}}>
                                <Text tag={'span'} mods={modsTdText}>
                                    {moment(file.lastCommit.ts).fromNow()}
                                </Text>
                            </TableCell>
                        </TableRow>
                    );
                }) : null}
            </TableTBody>
        </Table>);
};