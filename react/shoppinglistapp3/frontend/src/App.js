import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyForm from './MyForm';
import MyList from './MyList';
import {Switch,Route} from 'react-router-dom';
import Navbar from './Navbar';

class App extends React.Component{
  
  constructor(props) {
	  super(props);
	  this.state= {
		  list:[]		  
	  }
  }
  
  componentDidMount() {
	  console.log("Component Did Mount - App.js");
	  this.getShoppingList();
  }
  
  getShoppingList = () => {
	  let request = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"}
	  }
	  fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					})
				}).catch(error => {
					console.log("Error in parsing response json");	
				});
			} else {
				console.log("Server responded with status:"+response.statusText);
	  }}).catch(error => {
			console.log(error);
		});
  }
  
  addToList = (item) => {
	  let request = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"},
		  body:JSON.stringify(item)
	  }
	  fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				console.log("addToList success");
				this.getShoppingList();
			} else {
				console.log("Server responded with status:"
				+response.statusText);
			}
	  }).catch(error => {
			console.log(error);
	  })

  }
  
  removeFromList = (id) => {
	  let request = {
		  method:"DELETE",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"}
	  }
	  fetch("/api/shopping/"+id,request).then(response => {
			if(response.ok) {
				console.log("RemoveFromList success");
				this.getShoppingList();
			} else {
				console.log("Server responded with status:"+response.statusText);
			}
	  }).catch(error => {
			console.log(error);
	  })

  }
  
  editItem = (item) => {
	  let request = {
		  method:"PUT",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"},
		  body:JSON.stringify(item)
	  }
	  fetch("/api/shopping/"+item.id,request).then(response => {
			if(response.ok) {
				console.log("editItem success");
				this.getShoppingList();
			} else {
				console.log("Server responded with status:"+response.statusText);
			}
	  }).catch(error => {
			console.log(error);
	  })

  }
  
  render() {
	  return (
		<div className="App">
			<Navbar />
			<hr/>
			<Switch>
				<Route exact path="/" render={() => 
					<MyList list={this.state.list}
							removeFromList={this.removeFromList}
							editItem={this.editItem}/>	
				}/>
				<Route path="/form" render={() => 
					<MyForm addToList={this.addToList}/>
				}/>
			</Switch>
		</div>
	  );
  }
}

export default App;
