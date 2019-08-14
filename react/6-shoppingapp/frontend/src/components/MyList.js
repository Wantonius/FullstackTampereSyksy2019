import React from 'react';
import {Table} from 'semantic-ui-react';
import NormalRow from './NormalRow';
import DeleteRow from './DeleteRow';
import EditRow from './EditRow';
import {connect} from 'react-redux';
import {removeFromList,editItem} from '../actions/shoppingActions';

class MyList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1
		}
	}
	
	remove = (id) => {		
		for(let i=0;i<this.props.list.length;i++) {
			if(this.props.list[i]._id === id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				});
				return;
			} 
		}
	}
	
	edit = (id) => {
		for(let i=0;i<this.props.list.length;i++) {
			if(this.props.list[i]._id === id) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				});
				return;
			} 
		}
	}	
	handleRemove = (id) => {
		this.props.dispatch(removeFromList(id,this.props.token));
		this.cancel();
	}
	
	handleEdit = (item) => {
		this.props.dispatch(editItem(item,this.props.token));
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
						key={item._id}
						handleRemove={this.handleRemove}
						cancel={this.cancel}/>
			}
			if(this.state.editIndex === index) {
				return <EditRow key={item._id}
							item={item}
							editItem={this.handleEdit}
							cancel={this.cancel}/>
			}
			return <NormalRow key={item._id}
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

const mapStateToProps = (state) => {
	return {
		list:state.shopping.list,
		token:state.login.token
	}
}

export default connect(mapStateToProps)(MyList);