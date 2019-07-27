import React, { Component } from 'react';

class Header extends Component { 

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="banner">
				<h5 className="hTitle">THE SHOWROOM</h5>
				<div className="hTitleBBorder"></div>
				<div class="search by box"></div>
			</div>
		);
	}
}

export default Header;