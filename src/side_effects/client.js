import { fork } from 'redux-saga/effects';

import webapiSideEffects from './webapi';

export default function* sideEffects() {
	yield [
		fork(webapiSideEffects)
	];
}