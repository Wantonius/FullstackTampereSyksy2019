import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyForm from './MyForm';
import MyList from './MyList';

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
	  /*let tempId = this.state.id;
	  item.id = tempId;	  
	  let templist = this.state.list.concat(item);
	  this.setState({
		  list:templist,
		  id:tempId+1
	  }, () => {
			console.log(this.state);
		})
	  */
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
	  /*let templist = [];
	  let tempId = parseInt(id,10);
	  for(let i=0;i<this.state.list.length;i++) {
		  if(tempId !== this.state.list[i].id) {
			  templist.push(this.state.list[i]);
		  }
	  }
	  this.setState({
		  list:templist
	  })*/
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
	  /*let templist = this.state.list.slice(0);
	  for(let i=0;i<templist.length;i++) {
		  if(item.id === templist[i].id) {
			  templist.splice(i,1,item);
			  this.setState({
				  list:templist
			  })
			  return;
		  }
	  }*/
  }
  
  render() {
	  return (
		<div className="App">
			<MyForm addToList={this.addToList}/>
			<MyList list={this.state.list}
					removeFromList={this.removeFromList}
					editItem={this.editItem}/>
		</div>
	  );
  }
}

export default App;
