import {
	USER_DISPLAYED_WEBAPI
} from '../constants/webapi';

export default function webApiReducer(state = {}, action) {
	switch (action.type) {
		case USER_DISPLAYED_WEBAPI:
			return {
				...state,
				info: action.payload.info,
				paths: action.payload.paths
			};
		default:
			return state;
	}
};
