import React, { Component } from 'react';

import Type from './type';
import { hasSchemaRef, getSchemaName, isArrayProperty } from '../../helpers/definition';

if (process.env.BROWSER) require('../../styles/path-details.scss');

export default class MethodResponse extends Component {
	render() {
		return (
			<article className="status-code">
				<div className="row">
					<div className="col-xs-2 col-sm-2"><span className={ this._getCodeClassNames() }>{ this.props.code }</span></div>
					<div><span className="description">{ this.props.details.description }</span></div>
				</div>
				{
					hasSchemaRef(this.props.details.schema) ? (
						<Type schemaName={ getSchemaName(this.props.details.schema) } isArray={ isArrayProperty(this.props.details.schema) } mainType={ true }/>
					) : null
				}
			</article>
		);
	}

	_getCodeClassNames() {
		return (this.props.code < 400) ? 'code label label-info' : 'code label label-danger';
	}
}