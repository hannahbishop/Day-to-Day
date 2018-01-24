import React from 'react';
import TodoCard from './TodoCard';
import PropTypes from 'prop-types';

const propTypes = {
  todos: PropTypes.array.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  swapPanel: PropTypes.func.isRequired
};

const TodoList = (props) => {
  const todoNode = props.todos.map((todo) => {
    return (
      <TodoCard
        todo = { todo }
        key = { todo.id }
        handleCheckbox = {props.handleCheckbox}
        removeTodo = {props.removeTodo}
        swapPanel = {props.swapPanel}
      />
    )
  });

  return (
    <ul className={props.className}>{todoNode}</ul>
  );
};

TodoList.propTypes = propTypes;

export default TodoList;
