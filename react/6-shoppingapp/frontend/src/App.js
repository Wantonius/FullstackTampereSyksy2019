import React from 'react';
import './App.css';
import MyForm from './components/MyForm';
import MyList from './components/MyList';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import {connect} from 'react-redux';


class App extends React.Component{
    
  render() {
	  return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Switch>
				<Route exact path="/" render={() => 
					this.props.isLogged ?
					(<Redirect to="/list"/>) :
					(<LoginForm />)	
				}/>
				<Route path="/list" render={() => 
					this.props.isLogged ?				
					(<MyList/>) :
					(<Redirect to="/"/>)
				}/>
				<Route path="/form" render={() => 
					this.props.isLogged ?
					(<MyForm/>) :
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
		isLogged:state.login.isLogged
	}
}

export default withRouter(connect(mapStateToProps)(App));
