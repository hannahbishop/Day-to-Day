import React from 'react';
import TodoCard from './TodoCard';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const propTypes = {
  className: PropTypes.string.isRequired,
  todos: PropTypes.array.isRequired,
  removeTodo: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  swapPanel: PropTypes.func.isRequired
};

const TodoList = (props) => {
  const removeTodo = (todoId) => {
    props.removeTodo(todoId, props.index)
  };
  const handleCheckbox = (todoId) => {
    props.handleCheckbox(todoId, props.index)
  };
  const swapPanel = (todoId) => {
    props.swapPanel(todoId, props.index)
  };
  const getItemStyle = (draggableStyle, isDragging) => ({
    userSelect: 'none',
    margin: `0 0 1rem 0`,
    
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
    
    // styles we need to apply on draggables
    ...draggableStyle
  });
  const todoNode = props.todos.map((todo, i) => {
    return (
      <Draggable draggableId={todo.id.toString()} key={todo.id} index={i}> 
        {(provided, snapshot) => (
          <div class="margin-1">
            <div class="margin-2"
              ref={provided.innerRef}
              style={getItemStyle(
                provided.draggableStyle,
                snapshot.isDragging
              )}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TodoCard
                todo = {todo}
                handleCheckbox = {handleCheckbox}
                removeTodo = {removeTodo}
                swapPanel = {swapPanel}
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