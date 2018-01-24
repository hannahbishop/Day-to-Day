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
    this.removeTodo = this.removeTodo.bind(this);
    this.swapPanel = this.swapPanel.bind(this);
  }

	updateLocalStorage() {
		if (typeof(Storage) !== "undefined")
			localStorage.setItem("todos", JSON.stringify(this.state.data));
  }

  addTodo(val, isComplete, panelID) {
    if (val !== '') {
      let id;
      if (typeof(Storage) !== "undefined") {
        id = parseInt(localStorage.getItem("count"), 10);
      } else {
        id = window.id;
      }
      const todo = {
        text: val,
        isComplete: isComplete,
        panelID: panelID,
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

  removeTodo(id) {
    const remaining = this.state.data.filter(todo => todo.id !== id);
    this.setState({
      data: remaining
    }, () => {
      this.updateLocalStorage();
    });
  }

  handleCheckbox(id) {
    let toAdd = [];
    toAdd = this.state.data.filter(todo => todo.id === id);
    toAdd.forEach((todo) => {
      todo.isComplete = !todo.isComplete;
      this.state.data
        .splice(0, 0, this.state.data
          .splice(this.state.data.indexOf(todo), 1)[0]);
      this.setState(
        {data: this.state.data}, 
        () => (this.updateLocalStorage())
      );
    });
  }

  swapPanel(id) {
    const swapped = this.state.data
      .map((todo) => {
        if (todo.id === id) { todo.panelID = 1 - todo.panelID }
        return todo;
      });
    this.setState(
      {data: swapped},
      () => (this.updateLocalStorage())
    );
  }

  renderPanels() {
    return [...Array(this.props.panels)].map((u, i) => (
        <li className = "todo-panel">
          <TodoPanel
            id = {i}
            todos = {this.state.data}
            addTodo = {this.addTodo}
            handleCheckbox = {this.handleCheckbox}
            removeTodo = {this.removeTodo}
            swapPanel = {this.swapPanel}
          />
        </li>
      ));
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
    const panelNode = this.renderPanels()
    return (
      <ul className = "todo-app">{panelNode}</ul>
    );
  }
}

export default TodoApp;
