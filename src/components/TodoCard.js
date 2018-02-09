import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  todo: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

const TodoCard = (props) => {
  let isComplete = props.todo.isComplete;
  const handleCheckbox = () => {
    props.handleCheckbox(props.todo.id, false);
  };
  const removeTodo = () => {
    props.removeTodo(props.todo.id)
  };
  return(
    <div>
      <button
        className = {
          "todo__check " +
          (isComplete ? "todo__check--complete" : "todo__check--incomplete")
        }
        onClick = {handleCheckbox}
      ></button>
      <p className="todo__text"> {props.todo.text} </p>
      <button
        className = "todo__delete"
        onClick = {removeTodo}>X</button>
    </div>
  )
}

TodoCard.propTypes = propTypes;

export default TodoCard;
