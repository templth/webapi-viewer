import React from 'react';
import { render } from 'react-dom';

import { browserHistory } from 'react-router';
import defineRoutes from './routes';

const routes = defineRoutes(browserHistory);

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import createSagaMiddleware from 'redux-saga';
import sideEffects from './side_effects/client';

import { fromJS } from 'immutable';

const initialState = window.__INITIAL_STATE__ || {};
const { webapi, selection } = initialState;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, {
	webapi: webapi || {},
	selection: selection || {}
	/*businesses: fromJS(businesses || {}),
	currentSearch: fromJS(currentSearch || {}),
	device,
	places: fromJS(places || {}),
	services: fromJS(services || {}),
	slugs: fromJS(slugs || {})*/
}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sideEffects);

//if (process.env.NODE_ENV === 'development') window.store = store;

render(
	<Provider store={ store }>
		{ routes( action => store.dispatch(action) ) }
	</Provider>,
	document.getElementById('webapi')
);
