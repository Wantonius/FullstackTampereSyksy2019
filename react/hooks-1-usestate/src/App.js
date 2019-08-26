import React,{useState} from 'react';
import ShoppingForm from './components/ShoppingForm';
//import ShoppingList from './components/ShoppingList';
import './App.css';

function App() {

	const [state,setState] = useState({
		list:[],
		id:100
	});
	
	const addToList = (item) => {
		item.id = state.id;
		let tempList = state.list.concat(item);
		let tempId = state.id+1;
		setState({
			list:tempList,
			id:tempId
		});
	}
	
	return (
	<div className="App">
		<ShoppingForm addToList={addToList}/>
		<hr/>

	</div>
	);
}

export default App;
