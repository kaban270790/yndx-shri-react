import './TableMobile.scss';
import '../List/List.scss';
import '../IconNav/IconNav.scss';
import '../IconFile/IconFile.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import List from "../List/List.jsx";
import ListItem from "../List/List-Item.jsx";
import IconPlus from "../IconPlus/IconPlus.jsx";
import IconPlusIcon from '../IconPlus/IconPlus-Icon.jsx';
import IconPlusText from '../IconPlus/IconPlus-Text.jsx';
import Text from "../Text/Text.jsx";
import moment from "moment";
import {useSelector} from "react-redux";

const cnTableMobile = cn('TableMobile');
const cnIconNav = cn('IconNav');
const cnIconFile = cn('IconFile');

export default (props) => {
    const {files} = useSelector((state) => ({
        files: state.files || {}
    }));

    return <List mods={{displayPc: 'none'}} className={cnTableMobile()}>
        {files.length > 0 ? files.map((file, index) => {
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
                                }}>{file.lastCommit.message}</Text>
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
                                    }}>{file.lastCommit.hash.slice(0, 6)}</Text> by {file.lastCommit.committer}, {moment(file.lastCommit.ts).fromNow()}
                                </Text>
                            </ListItem>
                        </List>
                    </IconPlusText>
                    <IconPlusIcon
                        mods={{marginL: 8}}
                        className={cnIconNav({arrow: 'right'})}
                    />
                </IconPlus>
            </ListItem>
        }) : null}
    </List>;
};
