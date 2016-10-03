import React, { Component } from 'react';

import Parameter from './parameter';
import Response from './response';

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
								{
									this._hasConsumes() ? (
										<div className="in row">
											<div className="col-xs-2 col-sm-2">
												<span className="label label-success">in</span>
											</div>
											<div>
											{
												this.props.details.consumes.map(mediaType => (
													<span className="media-type label label-info" key={ mediaType }>{ mediaType }</span>
												))
											}
											</div>
										</div>
									) : null
								}
								{
									this._hasProduces() ? (
										<div className="out row">
											<div className="col-xs-2 col-sm-2">
												<span className="label label-warning">out</span>
											</div>
											<div>
											{
												this.props.details.produces.map(mediaType => (
													<span className="media-type label label-info" key={ mediaType }>{ mediaType }</span>
												))
											}
											</div>
										</div>
									) : null
								}
							</div>
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