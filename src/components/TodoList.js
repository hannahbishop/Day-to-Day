import React from 'react';
import TodoCard from './TodoCard';

const TodoList = (props) => {
  const todoNode = props.todos.map((todo) => {
    return (<TodoCard todo = { todo } key = { todo.id } removeTodo = { props.removeTodo }/>)
  });
  return (<ul>{todoNode}</ul>);
}

export default TodoList;
