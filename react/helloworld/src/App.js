import React from 'react';
import HelloWorld from './HelloWorld';
import './App.css';

class App extends React.Component {
  render() {
	  return (
		<div className="App">
			<h1>Hello World</h1>
			<HelloWorld name="Erno"/>
			<HelloWorld/>
		</div>
	  );
  }
}

export default App;
