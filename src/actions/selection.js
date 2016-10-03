import {
	WEBAPI_PATH_SELECTED,
	USER_SELECT_WEBAPI_PATH,
	WEBAPI_PATH_NOT_FOUND
} from '../constants/selection';

export const userSelectWebApiPath = (path) => ({
	type: USER_SELECT_WEBAPI_PATH,
	payload: path
});

export const webApiPathSelect = ({ path, details, definitions }) => ({
	type: WEBAPI_PATH_SELECTED,
	payload: { path, details, definitions }
});

export const webApiPathNotFound = ({ path }) => ({
	type: WEBAPI_PATH_NOT_FOUND,
	payload: { path }
});