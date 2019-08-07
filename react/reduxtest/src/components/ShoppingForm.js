import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';

class ShoppingForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type:"",
			price:0,
			count:0
		}
		
	}
	
	onSubmit = event => {
		event.preventDefault();
		let item = {
			type:this.state.type,
			price:this.state.price,
			count:this.state.count
		}
		this.props.dispatch({
			type:"ADD_TO_LIST",
			item:item
		})
	}
	
	onChange = event => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	render() {
		return(
			<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label htmlFor="type">Item Type:</label>
					<input type="text"
						   name="type"
						   onChange={this.onChange}
						   value={this.state.type}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="price">Item Price:</label>
					<input type="number"
						   name="price"
						   onChange={this.onChange}
						   value={this.state.price}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="count">Number of Items:</label>
					<input type="number"
						   name="count"
						   onChange={this.onChange}
						   value={this.state.count}/>
				</Form.Field>
				<Button type="submit">Add</Button>
			</Form>
		)
	}

}

export default connect()(ShoppingForm);

