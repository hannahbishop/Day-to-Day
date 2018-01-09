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
      const todo = { text: val, id: id++ }
      this.state.data.push(todo);
      this.setState({ data: this.state.data });
    }
  }

  removeTodo(id) {
   const remaining = this.state.data.filter((todo) => {
     if(todo.id !== id) return todo;
   });
   this.setState({ data: remaining });
 }

  render() {
    return (
      <div>
        <TodoForm addTodo = { this.addTodo.bind(this) }/>
        <TodoList
          todos = { this.state.data }
          removeTodo = { this.removeTodo.bind(this) }
        />
      </div>
    );
  }
}

export default TodoApp;
