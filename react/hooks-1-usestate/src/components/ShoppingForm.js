import React,{useState} from 'react';
import {Form,Button} from 'semantic-ui-react';

const ShoppingForm = ({addToList}) => {

	const [state,setState] = useState({
		type:"",
		price:0,
		count:0,
		id:0
	})
	
	const onChange = (event) => {
		setState({
			...state,
			[event.target.name]:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		addToList(state);
	}
	
	return (
		<Form onSubmit={onSubmit}>
			<Form.Field>
				<label htmlFor="type">Type</label>
				<input type="text"
					   name="type"
					   onChange={onChange}
					   value={state.type}/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="price">Price</label>
				<input type="number"
					   name="price"
					   onChange={onChange}
					   value={state.price}/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="count">Count</label>
				<input type="number"
					   name="count"
					   onChange={onChange}
					   value={state.count}/>
			</Form.Field>
			<Button type="submit">Add</Button>
		</Form>
	)
	
}

export default ShoppingForm;