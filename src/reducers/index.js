import { combineReducers } from 'redux';
import webapi from './webapi';
import selection from './selection';

export default combineReducers({
	webapi,
	selection
});