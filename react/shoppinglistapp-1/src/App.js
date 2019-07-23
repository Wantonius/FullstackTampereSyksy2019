import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyForm from './MyForm';
import MyList from './MyList';

class App extends React.Component{
  
  constructor(props) {
	  super(props);
	  this.state= {
		  list:[],
		  id:100
	  }
  }
  
  addToList = (item) => {
	  let tempId = this.state.id;
	  item.id = tempId;	  
	  let templist = this.state.list.concat(item);
	  this.setState({
		  list:templist,
		  id:tempId+1
	  }, () => {
			console.log(this.state);
		})
	  
  }
  
  removeFromList = (id) => {
	  let templist = [];
	  let tempId = parseInt(id,10);
	  for(let i=0;i<this.state.list.length;i++) {
		  if(tempId !== this.state.list[i].id) {
			  templist.push(this.state.list[i]);
		  }
	  }
	  this.setState({
		  list:templist
	  })
  }
  
  editItem = (item) => {
	  let templist = this.state.list.slice(0);
	  for(let i=0;i<templist.length;i++) {
		  if(item.id === templist[i].id) {
			  templist.splice(i,1,item);
			  this.setState({
				  list:templist
			  })
			  return;
		  }
	  }
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
