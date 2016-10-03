import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { USER_DISPLAY_WEBAPI } from '../constants/webapi';
import { USER_SELECT_WEBAPI_PATH } from '../constants/selection';
import { userDisplayedWebApi } from '../actions/webapi';
import { webApiPathSelect, webApiPathNotFound } from '../actions/selection';
import { fetchData, isErrorResponse } from '../helpers/fetch';

export default function* webapiSideEffects() {
	return yield [
		takeLatest(USER_SELECT_WEBAPI_PATH, handleSelectWebApiPath)
	];
}

export function *handleSelectWebApiPath({ payload }) {
	let path = '/' + payload.path.join('/');
	let state = yield select();
	if (state.selection && state.selection.path === path) {
		return;
	}

	let response = yield fetchData(`/api${path}`, 'GET');
	if (isErrorResponse(response)) {
		yield put(webApiPathNotFound({ path }));
	} else {
		let responsePayload = yield response.json();
		let details = responsePayload.details;
		let definitions = responsePayload.definitions;

		yield put(webApiPathSelect({ path, details, definitions }));
	}
}