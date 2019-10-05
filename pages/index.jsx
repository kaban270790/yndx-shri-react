import React from "react";
import {actionTick, actionSetRepositories} from "../src/lib/store.js";
import {connect} from "react-redux";
import Time from '../src/components/Time/Time.jsx';
import nextExpressPage from "next-express/page";
import App from "../src/components/App/App.jsx";
import TabList from "../src/components/TabList/TabList.jsx";
import TableMobile from "../src/components/TableMobile/TableMobile.jsx";

class Index extends React.Component {
    constructor(props) {
        super(props);
        props.dispatch(actionSetRepositories(props.repositories));
    }

    componentDidMount(props) {
        // this.timer = setInterval(() => {
        //     this.props.dispatch(actionTick());
        // }, 1000);
    }

    componentWillUnmount() {
        // clearInterval(this.timer);
    }

    render() {

        const files = [
            {
                ext: 'folder',
                name: 'name',
                lastCommit: {
                    message: 'commit',
                    hash: 'jdfsdnfkjsdnkfsndkmfyujnk',
                    committer: 'Alexey Besedin',
                    ts: Date.now()
                }
            },
            {
                ext: 'folder',
                name: 'name',
                lastCommit: {
                    message: 'commit',
                    hash: 'jdfsdnfkjsdnkfsndkmfyujnk',
                    committer: 'Alexey Besedin',
                    ts: Date.now()
                }
            }
        ];
        return <>
            <App title={"Список файлов"}>
                <TabList active={'files'}/>
                <TableMobile files={files}/>
            </App>
        </>;
    }
}

export default connect()(nextExpressPage(Index));
