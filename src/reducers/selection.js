import {
	WEBAPI_PATH_SELECTED,
	WEBAPI_PATH_NOT_FOUND
} from '../constants/selection';

export default function selectionReducer(state = {}, action) {
	switch (action.type) {
		case WEBAPI_PATH_SELECTED:
			return {
				...state,
				path: action.payload.path,
				details: action.payload.details,
				definitions: action.payload.definitions
			};
		case WEBAPI_PATH_NOT_FOUND:
			return {
				...state,
				notFound: true
			};
		default:
			return state;
	}
};
