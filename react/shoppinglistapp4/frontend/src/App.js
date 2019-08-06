import React from 'react';
import './App.css';
import MyForm from './MyForm';
import MyList from './MyList';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
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
	  if(sessionStorage.getItem("state")) {
		  console.log("state found!");
		  let tempState = JSON.parse(sessionStorage.getItem("state"));
		  this.setState(tempState, () => {
			  if(this.state.isLogged) {
				this.getShoppingList()
			  }});
	  }
  }
  
  saveToStorage = () => {
	  sessionStorage.setItem("state", JSON.stringify(this.state));
  }
  
  //LOGIN API
  
  handleStatus = (status) => {
	  if(status === 403) {
		  this.setState({
			  token:"",
			  isLogged:false
		  }, () => {this.saveToStorage()});
	  }
  }
  
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
					  this.saveToStorage();
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
  
  logout = () => {
	 let request = {
		 method:"POST",
		 mode:"cors",
		 headers:{"Content-Type":"application/json",
					"token":this.state.token}
	 }
	 fetch("/logout",request).then(response => {
		if(response.ok) {
			this.setState({
				token:"",
				isLogged:false,
				list:[]
			},() => {this.saveToStorage()});
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
					}, () => {
						this.saveToStorage();
					})
				}).catch(error => {
					console.log("Error in parsing response json");	
				});
			} else {
				console.log("Server responded with status:"+response.statusText);
				this.handleStatus(response.status);
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
				this.props.history.push("/list");
			} else {
				console.log("Server responded with status:"
				+response.statusText);
				this.handleStatus(response.status);
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
				this.handleStatus(response.status);
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
				this.handleStatus(response.status);
			}
	  }).catch(error => {
			console.log(error);
	  })

  }
  
  render() {
	  return (
		<div className="App">
			<Navbar isLogged={this.state.isLogged}
					logout={this.logout}/>
			<hr/>
			<Switch>
				<Route exact path="/" render={() => 
					this.state.isLogged ?
					(<Redirect to="/list"/>) :
					(<LoginForm register={this.register}
							   login={this.login}/>)	
				}/>
				<Route path="/list" render={() => 
					this.state.isLogged ?				
					(<MyList list={this.state.list}
							removeFromList={this.removeFromList}
							editItem={this.editItem}/>) :
					(<Redirect to="/"/>)
				}/>
				<Route path="/form" render={() => 
					this.state.isLogged ?
					(<MyForm addToList={this.addToList}/>) :
					(<Redirect to="/"/>)
				}/>
				<Route render={() => 
					(<Redirect to="/"/>)
				}/>
			</Switch>
		</div>
	  );
  }
}

export default withRouter(App);
