import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class Description extends Component {
	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<ReactMarkdown source={ this.props.description } />
				</div>
			</div>
		);
	}
}