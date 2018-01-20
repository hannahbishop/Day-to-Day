import React from 'react';
import TodoCard from './TodoCard';
import PropTypes from 'prop-types';

const propTypes = {
  todos: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const TodoList = (props) => {
  const todoNode = props.todos.map((todo) => {
    return (
      <TodoCard
        todo = { todo }
        key = { todo.id }
        handleCheckbox = {props.handleCheckbox}
        removeTodo = {props.removeTodo}
      />
    )
  });

  return (
    <ul className={props.className}>{todoNode}</ul>
  );
};

export default TodoList;
