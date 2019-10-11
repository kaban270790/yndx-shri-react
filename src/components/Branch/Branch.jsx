import './Branch.scss';
import React from "react";
import {cn} from "@bem-react/classname";
import Text from "../Text/Text.jsx";
import moment from "moment";
import SelectorBranch from "../Selector/SelectorBranch.jsx";
import {useSelector} from "react-redux";

const cnBranch = cn('Branch');

export default (props) => {
    const {currentRepositoryName, repositories} = useSelector((state) => {
        return {
            currentRepositoryName: state.currentRepository,
            repositories: state.repositories
        }
    });
    let commit = {};
    repositories.forEach((repository) => {//todo переделать что бы хранить активный репозиторий как он есть в стэйте или метод для получения этого
        if (repository.name === currentRepositoryName) {
            commit = repository.lastCommit;
        }
    });
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
            >{commit.hash.slice(0, 6)}</Text> on <Text
                tag={'a'}
                href={'#'}
                mods={{color: 'link', underline: 'non'}}
            >{moment(commit.timestamp).format('lll')}</Text> by <Text
                tag={'span'}
                elem={'FirstSymbol'}
            >{commit.committer.slice(0, 1)}</Text>{commit.committer.slice(1)}
            </Text>
        </div>
    </div>;
};
