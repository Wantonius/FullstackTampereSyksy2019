import React,{useState} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import './App.css';

function App() {

	const [state,setState] = useState({
		list:[],
		id:100
	});
	
	const addToList = (item) => {
		let tempId = state.id+1;
		let tempItem = {...item,"id":state.id};
		let tempList = state.list.concat(tempItem);
		setState({
			list:tempList,
			id:tempId
		});
	}
	
	return (
	<div className="App">
		<ShoppingForm addToList={addToList}/>
		<hr/>
		<ShoppingList list={state.list}/>
	</div>
	);
}

export default App;
