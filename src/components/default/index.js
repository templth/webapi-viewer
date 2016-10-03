import React, { Component } from 'react';

if (process.env.BROWSER) require('../../styles/layout.scss');

export default class DefaultPage extends Component {
	render() {
		return (
			<div className="alert alert-warning please-select">Pleased select a path above.</div>
		);
	}
}