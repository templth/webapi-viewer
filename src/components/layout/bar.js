import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

if (process.env.BROWSER) require('../../styles/paths-bar.scss');

export class PathsBar extends Component {
	render() {
		return (
			<ol className={ 'paths' }>
				{
					this.props.paths.map(path => (
						<li key={ path } className={ this._getClassNames(path) }>
							<Link to={ this._linkPath(path) }>{ path }</Link>
						</li>
					))
				}
			</ol>
		);
	}
	_linkPath(path) {
		return path;
	}
	_isSelected(path) {
		return (path === this.props.selectedPath);
	}
	_getClassNames(path) {
		return this._isSelected(path) ? 'selected' : '';
	}
}

export default connect(
	state => ({
		selectedPath: state.selection.path
	}), {
	},
	null,
	{pure: true}
)(PathsBar);
