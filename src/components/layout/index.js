import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import PathsBar from './bar';
import Header from './header';
import Description from './description';

if (process.env.BROWSER) require('../../styles/layout.scss');

class Layout extends Component {
	render() {
		return (
			<div>
				<Header info={ this.props.info } />
				<div className={ 'container' }>
      				<div className={ 'row' }>
      					<Description description={ this.props.info.description } />
						<PathsBar paths={ this.props.paths } />
      					{ this.props.children }
      				</div>
      			</div>
			</div>
		);
	}
}

export default connect(
	state => ({
		info: state.webapi.info,
		paths: state.webapi.paths
	}), {
	},
	null,
	{pure: true}
)(Layout);
