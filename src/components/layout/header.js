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

            				<a className="navbar-brand" href="#/">{ this.props.details.info.title }</a>
                  </div>
                  <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                      {
                        this.props.details.info.version ? (
                          <li><a href="#version">{ this.props.details.info.version }</a></li>
                        ) : null
                      }
                    </ul>
                  </div>
        			</div>
      			</div>
			</header>
		);
	}
}