import React from 'react';
import TodoCard from './TodoCard';
import PropTypes from 'prop-types';

const propTypes = {
  todos: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

const TodoList = (props) => {
  const todoNode = props.todos.map((todo) => {
    return (
      <TodoCard
        todo = { todo }
        key = { todo.id }
        handleCheckbox = { props.handleCheckbox }
      />
    )
  });

  return (
    <div>
      <ul>{todoNode}</ul>
    </div>
  );
};

export default TodoList;
