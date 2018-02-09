import React from 'react';
import TodoCard from './TodoCard';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const propTypes = {
  todos: PropTypes.array.isRequired,
  removeTodo: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

const TodoList = (props) => {
  const getItemStyle = (isDragging, draggableStyle) => {
    return ({
      userSelect: 'none',
      padding: '2rem',
      margin: `0 0 1rem 0`,
      border: 'solid 1px black',
      borderRadius: '3px',
      background: 'white',
    
      // change box shadow if dragging
      boxShadow: isDragging ? "3px 3px 3px grey" : "",
      // styles we need to apply on draggables
      ...draggableStyle,
    })
  };
  const todoNode = props.todos.map((todo, i) => {
    return (
      <Draggable
        className = {
          "todo__card " +
          (todo.isComplete ? "todo--complete" : "todo--incomplete" )
        }
        draggableId={todo.id.toString()} key={todo.id} index={i}
      > 
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <TodoCard
                todo = {todo}
                handleCheckbox = {props.handleCheckbox}
                removeTodo = {props.removeTodo}
              />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    )
  });

  return (
    <div className={props.className}>{todoNode}</div>
  );
};

TodoList.propTypes = propTypes;

export default TodoList;