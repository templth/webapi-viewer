import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class Description extends Component {
	render() {
		if (!this.props.details) return null;
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					{
						this.props.details.info.description ? (
							<ReactMarkdown source={ this.props.details.info.description } />
						) : null
					}
					{
						this.props.details.host ? (
							<div>
								<strong>Available at</strong> { this.props.details.host }{ this.props.details.basePath }
							</div>
						) : null
					}
					{
						this.props.details.info.contact ? (
							<div>
								<strong>Author:</strong> {
									this.props.details.info.contact.name ? (
										`${this.props.details.info.contact.name} (${this.props.details.info.contact.email})`
									) : (
										this.props.details.info.contact.email
									)
								}
							</div>
						) : null
					}
					{
						this.props.details.info.license ? (
							<div>
								<strong>License:</strong> { this.props.details.info.license.name } ({ this.props.details.info.license.url })
							</div>
						) : null
					}
					{
						this.props.details.info.termsOfService ? (
							<div>
								<strong>Terms of service:</strong> { this.props.details.info.termsOfService }
							</div>
						) : null
					}
				</div>
			</div>
		);
	}
}