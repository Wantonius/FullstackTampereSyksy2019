import React from 'react';
import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';

export default class Navbar extends React.Component {

	render() {
		return(
			<div>
				<Header>Shoppinglist App</Header>
				<List>
					<List.Item><Link to="/">Shopping List</Link></List.Item>
					<List.Item><Link to="/form">Add To List</Link></List.Item>
				</List>
			</div>
		)
	}

}