import React from 'react';
import { Router, IndexRoute, Route, applyRouterMiddleware } from 'react-router';

import { userDisplayWebApi } from './actions/webapi';
import { userSelectWebApiPath } from './actions/selection';
import { Layout, DefaultPage, PathDetails } from './components';

export default function routes(browserHistory) {
	return dispatch => (
		<Router
		    history={ browserHistory }
			render={ applyRouterMiddleware() }
		>
			<Route path={ '/' } component={ Layout } onEnter={ location => dispatch(userDisplayWebApi()) }>
				<IndexRoute component={ DefaultPage } />
				<Route path={ '/*' } component={ PathDetails } onEnter={ location => dispatch(userSelectWebApiPath({path: location.params.splat.split('/')})) } />
			</Route>
		</Router>
	);
}
