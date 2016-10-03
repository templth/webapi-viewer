import {
	WEBAPI_PATH_SELECTED
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
		default:
			return state;
	}
};
