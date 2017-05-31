import React from 'react'
import ReactDOM , { Component } from 'react-dom'
import { Router, Route, browserHistory} from 'react-router'
import routes from './routes';
import { createStore , applyMiddleware } from 'redux'
import logger from 'redux-logger'

import ReduxPromise from 'redux-promise';

const createStoreWithMIddleware = applyMiddleware(ReduxPromise, logger)(createStore);
import { Provider } from 'react-redux';

import reduces from './reducers/index'

let store = createStoreWithMIddleware(reduces);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
)