import React, { Component } from 'react';

import Type from './type';
import { hasSchemaRef, getSchemaName, isArrayProperty } from '../../helpers/definition';

if (process.env.BROWSER) require('../../styles/path-details.scss');

export default class MethodParameter extends Component {
	render() {
		return (
			<article className="parameter">
				<div className="row">
					<div className="col-xs-2 col-sm-2 name">{ this.props.parameter.name }</div>
					<div className="col-xs-2 col-sm-2">{ this.props.parameter.in }</div>
					<div className="col-xs-2 col-sm-2">{ this.props.parameter.type }</div>
					<div className="description col-xs-5 col-sm-5">{ this.props.parameter.description }</div>
				</div>
				{
					hasSchemaRef(this.props.parameter.schema) ? (
						<Type schemaName={ getSchemaName(this.props.parameter.schema) }
							isArray={ isArrayProperty(this.props.parameter.schema) }
							mainType={ true } />
					) : null
				}
			</article>
		);
	}
}