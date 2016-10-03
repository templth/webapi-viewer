import {
	USER_DISPLAY_WEBAPI,
	USER_DISPLAYED_WEBAPI
} from '../constants/webapi';

export const userDisplayWebApi = () => ({
	type: USER_DISPLAY_WEBAPI,
	payload: {}
});

export const userDisplayedWebApi = ({ info, paths }) => ({
	type: USER_DISPLAYED_WEBAPI,
	payload: { info, paths }
});

