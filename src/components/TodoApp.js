import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'; //remove?
import TodoPanel from './TodoPanel';

class TodoApp extends Component {

  constructor(props){
    super(props);
    const localData = JSON.parse(localStorage.getItem("todos"));
    this.state = {
      todos: localData || []
    };
    this.addTodo = this.addTodo.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    //tokenize the droppable IDs
    let [pIDStart, lIDStart] = result.source.droppableId
      .split(" ").map(str => parseInt(str, 10));
    let [pIDDest, lIDDest] = result.destination.droppableId
      .split(" ").map(str => parseInt(str, 10));
    const lStart = [];
    const lDest = [];
    const remaining = [];
    //make a copy of state, and filter todos based on location
    this.state.todos.slice().forEach((todo, i) => {
      if (
        (todo.panel === pIDStart) &&
        (+todo.isComplete === lIDStart)
      ) {
        lStart.push(todo);
      }
      else if (
        //don't want to create a separate destination list if todos are moved within the same droppable
        (result.source.droppableId !== result.destination.droppableId) &&
        (todo.panel === pIDDest) &&
        (+todo.isComplete === lIDDest)
      ) {
        lDest.push(todo);
      } else {
        remaining.push(todo);
      }
    });
    //reorder todos
    const [moved] = lStart.splice(result.source.index, 1);
    moved.panel = pIDDest;
    moved.isComplete = lIDDest;
    if (result.source.droppableId !== result.destination.droppableId) {
      lDest.splice(result.destination.index, 0, moved);
    } else {
      lStart.splice(result.destination.index, 0, moved);
    }
    //stitch back together and set state
    const newTodos = [...lStart, ...lDest, ...remaining];
    this.setState(
      {todos: newTodos}, 
      () => {this.updateLocalStorage();}
    );
  }

	updateLocalStorage() {
		if (typeof(Storage) !== "undefined")
			localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  addTodo(val, panel) {
    if (val !== '') {
      let id;
      if (typeof(Storage) !== "undefined") {
        id = parseInt(localStorage.getItem("count"), 10);
      } else {
        id = window.id;
      }
      const todo = {
        id: id,
        text: val,
        isComplete: false,
        panel: panel
      }
      this.setState(
        {todos: [todo, ...this.state.todos]}, 
        () => {this.updateLocalStorage();}
      );
      if (typeof(Storage) !== "undefined") {
        id++;
        localStorage.setItem("count", String(id));
      } else {
        window.id++;
      }
    }
  }

  removeTodo(id) {
    const remaining = this.state.todos
      .filter(todo => todo.id !== id);
    this.setState(
      {todos: remaining}, 
      () => {this.updateLocalStorage();}
    );
  }

  handleCheckbox(id, panel) {
    const copyData = this.state.todos.slice();
    copyData.forEach((todo, i) => {
      if (todo.id === id) {
        const [todoMatch] = copyData.splice(i, 1);
        todoMatch.isComplete = !todoMatch.isComplete;
        copyData.splice(0, 0, todoMatch);
      }
    });
    this.setState(
      {todos: copyData}, 
      () => {this.updateLocalStorage();}
    );
  }

  renderPanels() {
    const panels = [];
    [0,1].forEach((i) => {
      panels.push (
        <li key = {i} className = "todo-panel">
          <TodoPanel
            id = {i}
            title = {i ? "Today" : "Later"}
            todos = {this.state.todos.filter(todo => todo.panel === i)}
            addTodo = {this.addTodo}
            handleCheckbox = {this.handleCheckbox}
            removeTodo = {this.removeTodo}
          />
      </li>
      )
    });
    return panels;
  }

  componentDidMount() {
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("todos", JSON.stringify(this.state.todos));
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
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <ul className = "todo-app">{this.renderPanels()}</ul>
      </DragDropContext>
    );
  }
}

export default TodoApp;
