import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

let id = 0;
class TodoApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  addTodo(val) {
    if (val !== '') {
      const todo = { text: val, isComplete: 0, id: id++ }
      this.state.data.push(todo);
      this.setState({ data: this.state.data });
    }
  }

  completeTodo(id) {
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
      <div>
        <TodoForm addTodo = { this.addTodo.bind(this) }/>
        <TodoList
          todos = { this.state.data }
          completeTodo = { this.completeTodo.bind(this) }
        />
      </div>
    );
  }
}

export default TodoApp;
