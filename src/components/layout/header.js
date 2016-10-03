import React, { Component } from 'react';

export default 	class Header extends Component {
	render() {
		return (
			<header>
				<div className="navbar navbar-default" role="navigation">
        			<div className="container">
          				<div className="navbar-header">
				            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse">
	              				<span className="sr-only">Toggle navigation</span>
    	          				<span className="icon-bar"></span>
        	      				<span className="icon-bar"></span>
            	  				<span className="icon-bar"></span>
            				</button>

            				<a className="navbar-brand" href="#/">{this.props.info.title }</a>
          				</div>
        			</div>
      			</div>
			</header>
		);
	}
}