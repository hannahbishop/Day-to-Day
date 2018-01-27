import React from 'react';
import TodoCard from './TodoCard';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const propTypes = {
  todos: PropTypes.array.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  swapPanel: PropTypes.func.isRequired
};

const TodoList = (props) => {
  const todoNode = props.todos.map((todo, index) => {
    return (
      <Draggable draggableId={todo.id} key={todo.id} index={index}> 
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TodoCard
                todo = {todo}
                handleCheckbox = {props.handleCheckbox}
                removeTodo = {props.removeTodo}
                swapPanel = {props.swapPanel}
              />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    )
  });

  return (
    <ul className={props.className}>{todoNode}</ul>
  );
};

TodoList.propTypes = propTypes;

export default TodoList;