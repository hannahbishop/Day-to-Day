import React from 'react';

const Todo = props => {
  return(
    <div>
      <li> { props.todo.text } </li>
      <button onClick = { () => { props.removeTodo(props.todo.id) } }> Remove </button>
    </div>
  );
};

export default Todo;
