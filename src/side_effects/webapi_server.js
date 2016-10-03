import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { USER_DISPLAY_WEBAPI } from '../constants/webapi';
import { USER_SELECT_WEBAPI_PATH } from '../constants/selection';
import { userDisplayedWebApi } from '../actions/webapi';
import { webApiPathSelect, webApiPathNotFound } from '../actions/selection';
import { getWebApiInfo, getWebApiPaths, getWebApiResource, getDefinitions } from '../server/webapi_service';

export default function* webapiSideEffects() {
	return yield [
		takeLatest(USER_DISPLAY_WEBAPI, handleDisplayWebApi),
		takeLatest(USER_SELECT_WEBAPI_PATH, handleSelectWebApiPath)
	];
}

function *handleDisplayWebApi() {
	let info = getWebApiInfo();
	let paths = getWebApiPaths();
	yield put(userDisplayedWebApi({ info, paths }));
}

function *handleSelectWebApiPath({ payload }) {
	let path = '/' + payload.path.join('/');
	let details = getWebApiResource(path);
	if (details) {
		let definitions = getDefinitions();
		yield put(webApiPathSelect({ path, details, definitions }));
	} else {
		yield put(webApiPathNotFound({ path }));
	}
}