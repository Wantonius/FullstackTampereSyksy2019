import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class DeleteRow extends React.Component {

	remove = (event) => {
		this.props.handleRemove(event.target.name);
	}

	cancel = (event) => {
		this.props.cancel();
	}

	render() {
		return (
			<Table.Row>
				<Table.Cell>{this.props.item.type}</Table.Cell>
				<Table.Cell>{this.props.item.price}</Table.Cell>
				<Table.Cell>{this.props.item.count}</Table.Cell>
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Cancel</Button>
							</Table.Cell>
				<Table.Cell>
					<Button color="green"
							name={this.props.item.id}
							onClick={this.remove}>Confirm</Button>
							</Table.Cell>
			</Table.Row>		
		)
		
	}
}