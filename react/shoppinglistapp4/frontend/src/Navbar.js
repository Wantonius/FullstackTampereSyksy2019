import React from 'react';
import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';

export default class Navbar extends React.Component {

	logout = () => {
		this.props.logout();
	}

	render() {
		let navbar = <List></List>
		if(this.props.isLogged) {
			navbar = <List>
					<List.Item><Link to="/list">Shopping List</Link></List.Item>
					<List.Item><Link to="/form">Add To List</Link></List.Item>
					<List.Item><Link to="/" onClick={this.logout}>Logout</Link></List.Item>
				</List>
		}
		return(
			<div style={{height:100, backgroundColor:"lightblue"}}>
				<Header>Shoppinglist App</Header>
				{navbar}
			</div>
		)
	}

}