import { fork } from 'redux-saga/effects';

import webapiSideEffects from './webapi_server';

export default function* sideEffects() {
	yield [
		fork(webapiSideEffects)
	];
}