import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	isCompositeProperty, hasSchemaRef, getSchemaName,
	isArrayProperty, isSimpleProperty, getPropertyType
} from '../../helpers/definition';
import ListIcon from 'react-icons/lib/ti/th-list';

if (process.env.BROWSER) require('../../styles/path-details.scss');

export class Type extends Component {
	render() {
		return (
			<div className="row">
				{
					this.props.mainType ? (
						<div className="col-xs-2 col-sm-2" style={{textAlign: 'center'}}>&#8618;</div>
					) : null
				}
				{
					// ({ this.props.schemaName })
					this.props.mainType ? (
						<div className="col-xs-2 col-sm-2">
							Data structure
							{ this.props.isArray ? ` (array of ${this.props.schemaName})` : ` (${this.props.schemaName})` }
						</div>
					) : null
				}
				<div className="col-xs-4 col-sm-4">
					<div className={ this._getClassNames() }>
						<ol className="properties">
							{
								this._getProperties().map(property => (
									<li key={ property.name }>
										<div>
											<span>{property.name}</span>
											<span className="type text-muted">{ getPropertyType(property.value) }</span>
											{
												isArrayProperty(property.value) ? (
													<span className="cardinality text-muted"><ListIcon /></span>
												) : null
											}
										</div>
										{
											isCompositeProperty(property.value) ? (
												<div className="row">
													<ol className="type">
														<ConnectedType schemaName={ getSchemaName(property.value) } />
													</ol>
												</div>
											) : null
										}
									</li>
								))
							}
						</ol>
					</div>
				</div>
			</div>
		);
	}

	_getClassNames() {
		return this.props.mainType ? 'well' : '';
	}

	_getProperties() {
		let definitions = this.props.definitions[this.props.schemaName];
		let properties = this.props.definitions[this.props.schemaName].properties;
		return Object.keys(properties).map(propertyName => ({
			name: propertyName,
			value: properties[propertyName]
		}));
	}
}

var ConnectedType = connect(
	state => ({
		definitions: state.selection.definitions
	}), {
	},
	null,
	{pure: true}
)(Type);

export default ConnectedType;