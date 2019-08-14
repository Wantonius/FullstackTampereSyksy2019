import React from 'react';
import './App.css';
import MyForm from './components/MyForm';
import MyList from './components/MyList';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import {connect} from 'react-redux';

class App extends React.Component{
  
  constructor(props) {
	  super(props);
	  this.state= {
			list:[]
	  }
  }
  
  componentDidMount() {
	  if(this.props.isLogged) {
		  this.getShoppingList();
	  }
  }

  //SHOPPING API
  
  getShoppingList = () => {
	  let request = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
					"token":this.props.token}
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
					"token":this.props.token},
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
					"token":this.props.token}
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
					"token":this.props.token},
		  body:JSON.stringify(item)
	  }
	  fetch("/api/shopping/"+item._id,request).then(response => {
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
			<Navbar	logout={this.logout}/>
			<hr/>
			<Switch>
				<Route exact path="/" render={() => 
					this.props.isLogged ?
					(<Redirect to="/list"/>) :
					(<LoginForm />)	
				}/>
				<Route path="/list" render={() => 
					this.props.isLogged ?				
					(<MyList list={this.state.list}
							removeFromList={this.removeFromList}
							editItem={this.editItem}/>) :
					(<Redirect to="/"/>)
				}/>
				<Route path="/form" render={() => 
					this.props.isLogged ?
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

const mapStateToProps = (state) =>  {
	return {
		isLogged:state.isLogged,
		token:state.token
	}
}

export default withRouter(connect(mapStateToProps)(App));
