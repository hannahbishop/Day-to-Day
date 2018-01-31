import React, { Component } from 'react';
import TodoApp from './TodoApp';
import '../styles/App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {panels: 2};
  }

  render() {
    return (
      <TodoApp panels = {this.state.panels}/>
    );
  }
}

export default App;
