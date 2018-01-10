import React from 'react';
import Todo from './Todo';

const TodoCard = (props) => {
  return(
    <div className="todo-card">
      <Todo
        todo = { props.todo }
        completeTodo = { props.completeTodo }
      />
    </div>
  )
}

export default TodoCard;
