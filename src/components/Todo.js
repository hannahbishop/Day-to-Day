import React from 'react';

const Todo = props => {
  return(
    <div className="todo">
      <button
        className="todo_rmv"
        onClick = { () => { props.removeTodo(props.todo.id) }
      }></button>
      <li className="todo_text"> { props.todo.text } </li>
    </div>
  );
};

export default Todo;
