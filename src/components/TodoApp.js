import React from 'react';
import TodoPanel from './TodoPanel';

let id = 0;
class TodoApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  addTodo(val, isComplete) {
    if (val !== '') {
      const todo = { text: val, isComplete: isComplete, id: id++ }
      this.state.data.unshift(todo);
      this.setState({ data: this.state.data });
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
      let isComplete = todo.isComplete ? true : false;
      this.state.data.splice(this.state.data.indexOf(todo), 1); //delete this completed todo
      this.addTodo(todo.text, isComplete); //re-add to the top of the data array
    });
  }

  render() {
    return (
      <TodoPanel
        todos = { this.state.data }
        addTodo = { this.addTodo.bind(this) }
        handleCheckbox = { this.handleCheckbox.bind(this) }
      />
    );
  }
}

export default TodoApp;
