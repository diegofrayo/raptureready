import React, { Component } from 'react';
import { Router } from 'react-router';
import { Adrenaline } from '../Adrenaline';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
const history = __SERVER__ ? createMemoryHistory() : createBrowserHistory();

export default class AppContainer extends Component {
    render() {
        let {dataCallBack, initialData} = this.props;
        let adrenalineProps = {};
        if (!__SERVER__) {
            if (document.getElementById('app-props')) {
                let props = document.getElementById('app-props').textContent;
                props = props.slice(9, -3); // removing '<![CDATA[' and ']]>'
                let __initial_DATA__ = JSON.parse(props);
                adrenalineProps = {initialData: __initial_DATA__};
            }
        } else {
            const noNetworkLayer = require('../Adrenaline/network/noNetworkLayer').default;
            adrenalineProps = {
                fetchBeforeRender: true,
                initialData: initialData,
                fetchDoneCallback: dataCallBack,
                networkLayer: noNetworkLayer
            }
        }
        return (
            <Adrenaline {...adrenalineProps}>
                <Router history={history} routes={routes} />
            </Adrenaline>
        );
    }
}
