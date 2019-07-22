import React from 'react';

export default class Label extends React.Component {
	click = () => {
		this.props.changeColor();
	}
	
	render() {
		let labelStyle = {
			fontFamily:"sans-serif",
			fontWeight:"bold",
			padding:13,
			margin:0
			
		}
		return (
			<p onClick={this.click}
				style={labelStyle}>
				{this.props.color}
			</p>
		
		);
	}
}