import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd'; //remove?
import TodoPanel from './TodoPanel';

class TodoApp extends React.Component {

  constructor(props){
    super(props);
    const localData = JSON.parse(localStorage.getItem("todos"));
    this.state = {
      data: localData || {
        "panels": [
          {
            "id": 0,
            "lists": [
              {
                "id": 0,
                "todos": [
                  { "id": 0,
                    "text": "todo #0",
                    "isComplete": 1
                  },
                  { "id": 1,
                    "text": "todo #1",
                    "isComplete": 1
                  }
                ]
              },
              {
                "id": 1,
                "todos": [
                  { "id": 2,
                    "text": "todo #2",
                    "isComplete": 1
                  },
                  { "id": 3,
                    "text": "todo #3",
                    "isComplete": 1
                  }
                ]
              }
            ]
          },
          {
            "id": 1,
            "lists": [
              {
                "id": 2,
                "todos": [
                  { "id": 4,
                    "text": "todo #4",
                    "isComplete": 1
                  },
                  { "id": 5,
                    "text": "todo #5",
                    "isComplete": 1
                  }
                ]
              },
              {
                "id": 3,
                "todos": [
                  { "id": 6,
                    "text": "todo #6",
                    "isComplete": 1
                  },
                  { "id": 7,
                    "text": "todo #7",
                    "isComplete": 1
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    this.addTodo = this.addTodo.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.swapPanel = this.swapPanel.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside a droppable zone
    if (!result.destination) {
      return;
    }
    let [indexStartPanel, idStartList] = result.source.droppableId
      .split(" ")
        .map(str => parseInt(str, 10));
    let [indexDestPanel, idDestList] = result.destination.droppableId
      .split(" ")
        .map(str => parseInt(str, 10));
    let sPanel = this.state.data.panels[indexStartPanel];
    let dPanel = this.state.data.panels[indexDestPanel];
    const removed = sPanel.lists
      .filter(list => list.id === idStartList)
        .map((list, i) => {
          return list.todos.splice(result.source.index,1);
        }
    );
    dPanel.lists
      .filter(list => list.id === idDestList)
        .forEach((list, i) => {
          list.todos.splice(result.destination.index, 0, removed[0][0]);
        }
    );
    this.setState(
      {data: this.state.data}, 
      () => {this.updateLocalStorage();}
    );
  }

	updateLocalStorage() {
		if (typeof(Storage) !== "undefined")
			localStorage.setItem("todos", JSON.stringify(this.state.data));
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
        text: val,
        isComplete: 0,
        id: id
      }
      this.state.data.panels[panel].lists[0].todos.unshift(todo);
      this.setState(
        {data: this.state.data}, 
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

  removeTodo(todoId, list, panel) {
    const remaining = this.state.data.panels[panel].lists[list].todos
      .filter(todo => todo.id !== todoId);
    this.state.data.panels[panel].lists[list].todos = remaining;
    this.setState(
      {data: this.state.data}, 
      () => {this.updateLocalStorage();}
    );
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

  swapPanel(todoId, list, panel) {
    const newTodo = this.state.data.panels[panel].lists[list].todos
      .filter(todo => todo.id === todoId)[0];

    //add to new panel
    this.state.data.panels[1-panel].lists[list].todos
      .unshift(newTodo);

    //remove from panel
    const remaining = this.state.data.panels[panel].lists[list].todos
      .filter(todo => todo.id !== todoId);
    this.state.data.panels[panel].lists[list].todos = remaining;

    this.setState(
      {data: this.state.data}, 
      () => {this.updateLocalStorage()}
    );
  }

  renderPanels() {
    return this.state.data.panels.map((panel, i) => (
        <li className = "todo-panel">
          <TodoPanel
            lists = {this.state.data.panels[i].lists}
            id = {i}
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
        localStorage.setItem("count", "8");
      }
		} else {
			 console.log("App will not remember todos between sessions");
			window.id = 8;
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
