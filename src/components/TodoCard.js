import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  todo: PropTypes.object.isRequired,
  completeTodo: PropTypes.funct,
};

const TodoCard = (props) => {
  let isComplete = props.todo.isComplete;
  return(
    <li
      className = {
        "todo-card" +
        isComplete ? 'todo--complete' : 'todo--incomplete' }
    >
      <button
        className = {
          "todo_check " +
          (isComplete ? 'todo_check--complete' : 'todo_check--incomplete')
        }
        onClick = { () => { props.completeTodo(props.todo.id) }
      }></button>
      <p className="todo_text"> { props.todo.text } </p>
    </li>
  )
}

TodoCard.propTypes = propTypes;

export default TodoCard;
