import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import PropTypes from 'prop-types';

const propTypes = {
  todos: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  swapPanel: PropTypes.func.isRequired
};

const TodoPanel = props => {
  const viewNode = props.panel.lists.map((list, i) => {
    return(
      <Droppable droppableId={list.id.toString()}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            <TodoList
              className = "todo-list"
              todos = {list.todos}
              handleCheckbox = {props.handleCheckbox}
              removeTodo = {props.removeTodo}
              swapPanel = {props.swapPanel}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  });

  return (
    <div>
      <TodoForm 
        addTodo = {props.addTodo}
        panelID = {props.id}
      />
      <div className = "todo-list__view">{viewNode}</div>
    </div>
  )
};

TodoPanel.propTypes = propTypes;

export default TodoPanel;
