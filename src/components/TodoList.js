import React from 'react';
import TodoCard from './TodoCard';

const TodoList = (props) => {
  const todoNode = props.todos.map((todo) => {
    return (<TodoCard todo = { todo } key = { todo.id } removeTodo = { props.removeTodo }/>)
  });
  return (
    <div>
      <h2>{props.title}</h2>
      <ul>{todoNode}</ul>
    </div>
  );
}

export default TodoList;
