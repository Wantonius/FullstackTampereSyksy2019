import React from 'react';
import './App.css';
import MyForm from './MyForm';
import MyList from './MyList';
import {Switch,Route} from 'react-router-dom';
import Navbar from './Navbar';
import LoginForm from './LoginForm';

class App extends React.Component{
  
  constructor(props) {
	  super(props);
	  this.state= {
			list:[],
			isLogged:false,
			token:""
	  }
  }
  
  componentDidMount() {
	  console.log("Component Did Mount - App.js");
	  //this.getShoppingList();
  }
  
  //LOGIN API
  
  register = (user) => {
	  let request = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"},
		  body:JSON.stringify(user)
	  }
	  fetch("/register", request).then(response => {
		  if(response.ok) {
			  alert("Register success!");
		  } else {
			  console.log("Server responded with status:"+response.status);
		  }
	  }).catch(error => {
		  console.log(error);
	  })
  }
  
  login = (user) => {
	  let request = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"},
		  body:JSON.stringify(user)
	  }
	  fetch("/login", request).then(response => {
		  if(response.ok) {
			  response.json().then(data => {
				  this.setState({
					  isLogged:true,
					  token:data.token
				  }, () => {
					  this.getShoppingList();
				  })
			  }).catch(error => {
				  console.log("Error parsing JSON");
			  })
		  } else {
			  console.log("Server responded with status:"+response.status);
		  }
	  }).catch(error => {
		  console.log(error);
	  })
  }  
  //SHOPPING API
  
  getShoppingList = () => {
	  let request = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
					"token":this.state.token}
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
		  headers:{"Content-Type":"application/json",
					"token":this.state.token},
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
		  headers:{"Content-Type":"application/json",
					"token":this.state.token}
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
		  headers:{"Content-Type":"application/json",
					"token":this.state.token},
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
			<Navbar isLogged={this.state.isLogged}/>
			<hr/>
			<Switch>
				<Route exact path="/" render={() => 
					<LoginForm register={this.register}
							   login={this.login}/>	
				}/>
				<Route path="/list" render={() => 
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
