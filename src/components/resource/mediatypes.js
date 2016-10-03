import React, { Component } from 'react';

import Type from './type';

if (process.env.BROWSER) require('../../styles/path-details.scss');

export default class MediaTypes extends Component {
	render() {
		if (!this.props.mediaTypes) return null;
		return (
			<div className="in row">
				<div className="col-xs-2 col-sm-2">
					<span className="label label-success">{ this.props.label }</span>
				</div>
				<div>
				{
					this.props.mediaTypes.map(mediaType => (
						<span className="media-type label label-info" key={ mediaType }>{ mediaType }</span>
					))
				}
				</div>
			</div>
		);
	}
}