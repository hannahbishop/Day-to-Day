import React from 'react';
import Todo from './Todo';

const TodoCard = (props) => {
  return(
    <Todo todo = { props.todo } key = { props.todo } removeTodo = { props.removeTodo }/>
  )
}

export default TodoCard;
