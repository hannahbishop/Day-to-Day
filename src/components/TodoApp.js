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

  addTodo(val) {
    if (val !== '') {
      const todo = { text: val, isComplete: 0, id: id++ }
      this.state.data.push(todo);
      this.setState({ data: this.state.data });
    }
  }

  handleCheckbox(id) {
    const remaining = this.state.data.filter((todo) => {
      if(todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    this.setState({ data: remaining });
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
