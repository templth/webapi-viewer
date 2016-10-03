import React, { Component } from 'react';

import Type from './type';

if (process.env.BROWSER) require('../../styles/path-details.scss');

export default class MethodSecurity extends Component {
	render() {
		if (!this.props.security) return null;
		return (
			<div>
				{
					Object.keys(this.props.security).map(key => (
						<article className="security" key={ key }>
							<div className="out row">
								<div className="col-xs-2 col-sm-2">
									<span className="label label-warning">{ key }</span>
								</div>
								<div>
								{
									this.props.security[key].map(value => (
										<span className="media-type label label-info" key={ value }>{ value }</span>
									))
								}
								</div>
							</div>
						</article>
					))
				}
			</div>
		);
	}
}