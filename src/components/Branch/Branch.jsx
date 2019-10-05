import './Branch.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Text from "../Text/Text.jsx";
import moment from "moment";
import SelectorBranch from "../Selector/SelectorBranch.jsx";
import {useSelector} from "react-redux";

const cnBranch = cn('Branch');

export default (props) => {
    const {currentRepositoryName} = useSelector((state) => {
        return {
            currentRepositoryName: state.currentRepository
        }
    });
    const branch = {
        lastCommit: {
            hash: 'sadjdhfbjdfbjkxjsndhjfdjakshdsnfkjsnjkd',
            ts: Date.now(),
            committer: 'robot-shri-releaser'
        }
    };
    return <div className={cnBranch()}>
        <div className={cnBranch('Header')}>
            <Text className={cnBranch('RepositoryName')} mods={{
                color: 'black',
                size: 24,
                lHeight: 28
            }}>{currentRepositoryName}</Text>
            <SelectorBranch className={cnBranch('BranchName')}>
            </SelectorBranch>
        </div>
        <div className={cnBranch('LastCommit')}>
            <Text tag={'span'} mods={{
                color: 'black',
                size: 14,
                lHeight: 20
            }}>Last commit <Text
                tag={'a'}
                href={'#'}
                mods={{color: 'link', underline: 'non'}}
            >{branch.lastCommit.hash.slice(0, 6)}</Text> on <Text
                tag={'a'}
                href={'#'}
                mods={{color: 'link', underline: 'non'}}
            >{moment(branch.lastCommit.ts).format('lll')}</Text> by <Text
                tag={'span'}
                elem={'FirstSymbol'}
            >{branch.lastCommit.committer.slice(0, 1)}</Text>{branch.lastCommit.committer.slice(1)}
            </Text>
        </div>
    </div>;
};
