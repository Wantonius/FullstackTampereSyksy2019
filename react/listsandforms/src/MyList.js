import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class MyList extends React.Component {

	remove = (event) => {
		this.props.removeFromList(event.target.name);
	}

	render() {
		let listitems = this.props.list.map((item) => 
			<Table.Row key={item.id}>
				<Table.Cell>{item.type}</Table.Cell>
				<Table.Cell>{item.price}</Table.Cell>
				<Table.Cell>{item.count}</Table.Cell>
				<Table.Cell>
					<Button name={item.id}
							onClick={this.remove}>Remove</Button>
							</Table.Cell>
			</Table.Row>
		)	
	
	return(
		<Table celled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Type</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
					<Table.HeaderCell>Count</Table.HeaderCell>
					<Table.HeaderCell>Remove</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{listitems}
			</Table.Body>
		</Table>
	)
	}
}