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
                    "text": "todo #0"
                  },
                  { "id": 1,
                    "text": "todo #1"
                  }
                ]
              },
              {
                "id": 1,
                "todos": [
                  { "id": 2,
                    "text": "todo #2"
                  },
                  { "id": 3,
                    "text": "todo #3"
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
                    "text": "todo #4"
                  },
                  { "id": 5,
                    "text": "todo #5"
                  }
                ]
              },
              {
                "id": 3,
                "todos": [
                  { "id": 6,
                    "text": "todo #6"
                  },
                  { "id": 7,
                    "text": "todo #7"
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
    //alert("source: " + result.source.index + " dest: " + result.destination.index);
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
    return this.state.data.panels.map((panel, i) => (
        <li className = "todo-panel">
          <TodoPanel
            panel = {this.state.data.panels[i]}
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
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <ul className = "todo-app">{panelNode}</ul>
      </DragDropContext>
    );
  }
}

export default TodoApp;
