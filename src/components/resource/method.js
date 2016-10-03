import React, { Component } from 'react';

import Parameter from './parameter';
import Response from './response';
import MediaTypes from './mediatypes';
import Security from './security';

if (process.env.BROWSER) require('../../styles/path-details.scss');

let methodClassMap = {
	get: 'success',
	post: 'warning',
	put: 'warning',
	patch: 'warning',
	delete: 'danger',
	head: 'info',
	options: 'info'
};

export default class MethodDetailsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayAll: false
		};
	}

	componentDidMount() {
		this.setState({ displayBody: false });
	}

	render() {
		return (
			<article className={ this._getMethodClasses() }>
				<div className="panel-heading" onClick={ () => this._toggleDisplayBody() }>
					<h2 className="method pull-left text-muted">{ this.props.method }</h2>
					<div className="description pull-right">{ this.props.details.summary }</div>
			        <div className="clearfix"></div>
				</div>
				{
					this._shoulDisplayBody() ? (
						<div className="panel-body">
							{
								this._hasParameters() ? (
									<div className="parameters">
										<h3 className="text-muted">Parameters</h3>
										<div>
										{
											this.props.details.parameters.map(parameter => (
												<Parameter key={ parameter.name } parameter={ parameter } />
											))
										}
										</div>
									</div>
								) : null
							}
							<div className="responses">
								<h3 className="text-muted">Responses</h3>
								<div>
								{
									this.props.details.responses ? (
										Object.keys(this.props.details.responses).map(response => (
											<Response key={ response } code={ response } details={ this.props.details.responses[response] } />
										))
									) : null
								}
								</div>
							</div>
							<div className="media-types">
								<h3 className="text-muted">Media types</h3>
								<MediaTypes label="in" mediaTypes={ this.props.details.consumes } />
								<MediaTypes label="out" mediaTypes={ this.props.details.produces } />
							</div>
							{
								this._hasSecurity() ? (
									<div className="securities">
										<h3 className="text-muted">Security</h3>
										<div>
											{
												this.props.details.security ? (
													this.props.details.security.map(security => (
														<Security key={ security } security={ security } />
													))
												) : null
											}
										</div>
									</div>
								) : null
							}
						</div>
					) : null
				}
			</article>
		);
	}

	_hasConsumes() {
		return (this.props.details.consumes && this.props.details.consumes.length > 0);
	}

	_hasProduces() {
		return (this.props.details.produces && this.props.details.produces.length > 0);
	}

	_hasParameters() {
		return (this.props.details.parameters && this.props.details.parameters.length > 0);
	}

	_hasSecurity() {
		return (this.props.details.security && this.props.details.security.length > 0);
	}

	_getMethodClasses() {
		let methodClass = methodClassMap[this.props.method];
		return methodClass ?
			`panel panel-${methodClass}` :
			'panel panel-primary';
	}

	_shoulDisplayBody() {
		return this.state.displayBody;
	}

	_toggleDisplayBody() {
		this.setState({ displayBody: !this.state.displayBody });
	}
}