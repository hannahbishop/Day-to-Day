import React from 'react';
import TodoCard from './TodoCard';
import PropTypes from 'prop-types';

const propTypes = {
  todos: PropTypes.object.isRequired,
  completeTodo: PropTypes.funct,
};

const TodoList = (props) => {
  const todoNode = props.todos.map((todo) => {
    return (
      <TodoCard
        todo = { todo }
        key = { todo.id }
        completeTodo = { props.completeTodo }
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
