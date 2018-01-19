import React from 'react';
import TodoPanel from './TodoPanel';

//let id = 0;

class TodoApp extends React.Component {

  constructor(props){
    super(props);
    const localData = JSON.parse(localStorage.getItem("todos"));
    this.state = {
      data: localData || []
    };
    this.addTodo = this.addTodo.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
  }

	updateLocalStorage() {
		if (typeof(Storage) !== "undefined")
			localStorage.setItem("todos", JSON.stringify(this.state.data));
  }
  
  addTodo(val, isComplete) {
    if (val !== '') {
      let id;
      if (typeof(Storage) !== "undefined") {
        id = parseInt(localStorage.getItem("count"));
      } else {
        id = window.id;
      }
      const todo = { 
        text: val, 
        isComplete: isComplete, 
        id: id
      }
      this.state.data.unshift(todo);
      this.setState({
        data: this.state.data
      }, () => {
        this.updateLocalStorage();
      });
      if (typeof(Storage) !== "undefined") {
        id++;
        localStorage.setItem("count", String(id));
      } else {
        window.id++;
      }
    }
  }

  handleCheckbox(id) {
    let toAdd = [];
    toAdd = this.state.data.filter((todo) => {
      if(todo.id === id) {
        return todo;
      }
    });
    toAdd.map((todo) => {
      todo.isComplete = !todo.isComplete;
      this.state.data.splice(0, 0, this.state.data.splice(this.state.data.indexOf(todo), 1)[0]);
      this.setState({
        data: this.state.data
      }, () => {
        this.updateLocalStorage();
      });
    });
  }

  componentDidMount() {
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("todos", JSON.stringify(this.state.data));
      if(!localStorage.getItem("count")) {
        localStorage.setItem("count", "0");
      }
		} else {
			 console.log("App will not remember todos between sessions");
			window.id = 0;
		}
  }

  render() {
    return (
      <TodoPanel
        todos = {this.state.data}
        addTodo = {this.addTodo}
        handleCheckbox = {this.handleCheckbox}
      />
    );
  }
}

export default TodoApp;
