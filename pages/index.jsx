import React from "react";
import nextExpressPage from "next-express/page";
import App from "../src/components/App/App.jsx";

class FrontPage extends React.Component {
    static async getInitialProps(context, serverDataFetchFunc) {
        return serverDataFetchFunc();
    }

    render() {
        return <>
            {this.props.list.map((name, index) => {
                return <App key={index} name={name}/>
            })}
        </>;
    }
}

export default nextExpressPage(FrontPage);
