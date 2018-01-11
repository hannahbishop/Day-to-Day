import React, { Component } from 'react';
import TodoApp from './TodoApp';
import '../styles/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <TodoApp/>
      </div>
    );
  }
}

export default App;
