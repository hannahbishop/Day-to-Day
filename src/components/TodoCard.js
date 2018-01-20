import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  todo: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

const TodoCard = (props) => {
  let isComplete = props.todo.isComplete;
  return(
    <li
      className = {
        "todo-card " +
        (isComplete ? "todo--complete" : "todo--incomplete" )
      }
    >
      <button
        className = {
          "todo_check " +
          (isComplete ? "todo_check--complete" : "todo_check--incomplete")
        }
        onClick = { () => { props.handleCheckbox(props.todo.id, false) }
      }></button>
      <p className="todo_text"> { props.todo.text } </p>
      <button
        className = "todo_delete"
        onClick = { () => {
          props.removeTodo(props.todo.id)
        }
      }>X</button>
    </li>
  )
}

TodoCard.propTypes = propTypes;

export default TodoCard;
