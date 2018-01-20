import React from 'react';

const Todo = props => {
  let isComplete = props.todo.isComplete;
  return(
    <div
      className = {
        isComplete ? 'todo--complete' : 'todo--incomplete'
      }
    >
      <button
        className = {
          "todo_check " +
          (isComplete ? 'todo_check--complete' : 'todo_check--incomplete')
        }
        onClick = { () => { props.completeTodo(props.todo.id) }
      }></button>
      <li className="todo_text"> { props.todo.text } </li>
    </div>
  );
};

export default Todo;
