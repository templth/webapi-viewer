import React, { Component } from 'react';
import { connect } from 'react-redux';

import MethodDetails from './method';

if (process.env.BROWSER) require('../../styles/path-details.scss');

export class PageDetailsPage extends Component {
	render() {
		return (
			<div>
				<h1 className="text-muted">{ this.props.path } </h1>
				{
					this.props.notFound ? (
						<div className="alert alert-danger">No resource can be found for this path.</div>
					) : (
						<div className={ 'methods' }>
						{
							this.props.details ? (
								Object.keys(this.props.details).map(method => (
									<MethodDetails key={ method } method={ method } details={ this.props.details[method] } />
								))
							) : null
						}
						</div>
					)
				}
			</div>
		);
	}
}

export default connect(
	state => ({
		details: state.selection.details,
		path: state.selection.path,
		notFound: state.selection.notFound
	}), {
	},
	null,
	{pure: true}
)(PageDetailsPage);
