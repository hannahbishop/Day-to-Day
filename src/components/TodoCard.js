import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  todo: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  swapPanel: PropTypes.func.isRequired,
};

const TodoCard = (props) => {
  let isComplete = props.todo.isComplete;
  const handleCheckbox = () => {
    props.handleCheckbox(props.todo.id, false);
  };
  const swapPanel = () => {
    props.swapPanel(props.todo.id, props.todo.panelID)
  };
  const removeTodo = () => {
    props.removeTodo(props.todo.id)
  };
  return(
    <li
      className = {
        "todo__card " +
        (isComplete ? "todo--complete" : "todo--incomplete" )
      }
    >
      <button
        className = {
          "todo__check " +
          (isComplete ? "todo__check--complete" : "todo__check--incomplete")
        }
        onClick = {handleCheckbox}
      ></button>
      <p className="todo__text"> {props.todo.text} </p>
      <button 
        className = "todo__swap-panel"
        onClick = {swapPanel}>Swap</button>
      <button
        className = "todo__delete"
        onClick = {removeTodo}>X</button>
    </li>
  )
}

TodoCard.propTypes = propTypes;

export default TodoCard;
