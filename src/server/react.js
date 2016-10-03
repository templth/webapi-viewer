import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import dot from 'dot';
import path from 'path';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import assets from './assets';

import defineRoutes from '../routes';
import reducers from '../reducers';
import createSagaMiddleware, { END } from 'redux-saga';
import sideEffects from '../side_effects/server';
import { hasWebApiResource } from '../server/webapi_service';

const routes = defineRoutes();
const templates = dot.process({ path: path.resolve(__dirname, './views')});

export default (req, res) => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducers, {
	}, applyMiddleware(sagaMiddleware));
	let fetchData = sagaMiddleware.run(sideEffects);
	match({routes: routes(action => store.dispatch(action)), location: req.url}, (error, redirectLocation, renderProps) => {
		if (error) {
			store.dispatch(END);
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			store.dispatch(END);
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			fetchData.done.then( () => {
				const appString = renderToString(
					<Provider store={ store }>
						<RouterContext { ...renderProps } />
					</Provider>
					);
				const storeState = store.getState();
				const initialState = JSON.stringify(storeState);
				if (storeState.selection.notFound) {
					res.status(404).send('Not found');
				} else {
					res.status(200).send(templates.main({
						appString,
						initialState,
						assets
					}));
				}
			}).catch( e => {
				console.warn(e.stack);
				res.status(500).send('Something went wrong');
			});
			store.dispatch(END);
		} else {
			store.dispatch(END);
			res.status(404).send('Not found');
		}
	});
};