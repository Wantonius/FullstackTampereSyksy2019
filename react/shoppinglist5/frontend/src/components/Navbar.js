import React from 'react';
import {Link} from 'react-router-dom';
import {List,Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {onLogout} from '../actions/loginActions';

class Navbar extends React.Component {

	logout = () => {
		this.props.dispatch(onLogout(this.props.token));
	}

	render() {
		let status = "Shoppinglist App"
		if(this.props.loading) {
			status = "Loading..."
		}
		if(this.props.error.length > 0) {
			status = this.props.error
		}
		let navbar = <List></List>
		if(this.props.isLogged) {
			navbar = <List>
					<List.Item><Link to="/list">Shopping List</Link></List.Item>
					<List.Item><Link to="/form">Add To List</Link></List.Item>
					<List.Item><Link to="/" onClick={this.logout}>Logout</Link></List.Item>
				</List>
		}
		return(
			<div style={{height:100, backgroundColor:"lightblue"}}>
				<Header>{status}</Header>
				{navbar}
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		isLogged:state.isLogged,
		token:state.token,
		loading:state.loading,
		error:state.error
	}
}

export default connect(mapStateToProps)(Navbar);