import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import PropTypes from 'prop-types';

const TodoPanel = (props) => {
  const completed = props.todos.filter((todo) => {
    if(todo.isComplete) {
      return todo;
    }
  });
  const incomplete = props.todos.filter((todo) => {
    if(!todo.isComplete) {
      return todo;
    }
  });

  return (
    <div>
      <TodoForm addTodo = { props.addTodo }/>
      <TodoList
        className = "todolist--incomplete"
        todos = {incomplete}
        handleCheckbox = { props.handleCheckbox }
      />
      <TodoList
        className = "todolist--completed"
        todos = {completed}
        handleCheckbox = { props.handleCheckbox }
      />
    </div>
  )
};

export default TodoPanel;
