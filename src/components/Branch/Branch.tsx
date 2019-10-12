import './Branch.scss';
import React, {ComponentState} from "react";
import {cn} from "@bem-react/classname";
import Text from "../Text/Text";
import moment from "moment";
import SelectorBranch from "../Selector/SelectorBranch";
import {useSelector} from "react-redux";

const cnBranch = cn('Branch');
type Branch = { //todo Выпилить от сюда в общее место
    lastCommit: Commit
};
type Commit = { //todo Выпилить от сюда в общее место
    hash: string,
    timestamp: number,
    committer: string,
    source: string
};
type Repository = { //todo Выпилить от сюда в общее место
    name: string,
    lastCommit: Commit,
};
export default () => {
    const {currentRepositoryName, repositories} = useSelector((state: ComponentState) => {
        return {
            currentRepositoryName: state.currentRepository,
            repositories: state.repositories
        }
    });
    let commit: Commit | undefined;
    repositories.forEach((repository: Repository) => {//todo переделать что бы хранить активный репозиторий как он есть в стэйте или метод для получения этого
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
            <SelectorBranch className={cnBranch('BranchName')}/>
        </div>
        {commit !== undefined ?
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
            </div> : null}
    </div>;
};