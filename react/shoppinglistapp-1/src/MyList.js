import React from 'react';
import {Table} from 'semantic-ui-react';
import NormalRow from './NormalRow';
import DeleteRow from './DeleteRow';
import EditRow from './EditRow';

export default class MyList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1
		}
	}
	
	remove = (id) => {
		let tempId = parseInt(id,10);
		for(let i=0;i<this.props.list.length;i++) {
			if(this.props.list[i].id === tempId) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				});
				return;
			} 
		}
	}
	
	edit = (id) => {
		let tempId = parseInt(id,10);
		for(let i=0;i<this.props.list.length;i++) {
			if(this.props.list[i].id === tempId) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				});
				return;
			} 
		}
	}	
	handleRemove = (id) => {
		this.props.removeFromList(id);
		this.cancel();
	}
	
	editItem = (item) => {
		this.props.editItem(item);
		this.cancel();
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}

	render() {
		let listitems = this.props.list.map((item,index) => {
			if(this.state.removeIndex === index) {
				return <DeleteRow item={item}
						key={item.id}
						handleRemove={this.handleRemove}
						cancel={this.cancel}/>
			}
			if(this.state.editIndex === index) {
				return <EditRow key={item.id}
							item={item}
							editItem={this.editItem}
							cancel={this.cancel}/>
			}
			return <NormalRow key={item.id}
					   removeFromList={this.remove}
					   edit={this.edit}
					   item={item}/>		
		})	
	
	return(
		<Table celled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Type</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
					<Table.HeaderCell>Count</Table.HeaderCell>
					<Table.HeaderCell>Remove</Table.HeaderCell>
					<Table.HeaderCell>Edit</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{listitems}
			</Table.Body>
		</Table>
	)
	}
}