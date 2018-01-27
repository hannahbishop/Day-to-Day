import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import PropTypes from 'prop-types';

const propTypes = {
  todos: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  swapPanel: PropTypes.func.isRequired
};

const TodoPanel = props => {
  const addTodo = (value) => {
    props.addTodo(value, props.id);
  }
  const removeTodo = (todoId, list) => {
    props.removeTodo(todoId, list, props.id);
  }
  const handleCheckbox = (todoId, list) => {
    props.handleCheckbox(todoId, list, props.id);
  }
  const swapPanel = (todoId, list) => {
    props.swapPanel(todoId, list, props.id);
  }
  const viewNode = props.lists.map((list, i) => {
    return(
      <Droppable droppableId={list.id.toString()}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            <TodoList
              className = "todo-list"
              todos = {list.todos}
              index = {i}
              handleCheckbox = {handleCheckbox}
              removeTodo = {removeTodo}
              swapPanel = {swapPanel}
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
        addTodo = {addTodo}
        panelID = {props.id}
      />
      <div className = "todo-list__view">{viewNode}</div>
    </div>
  )
};

TodoPanel.propTypes = propTypes;

export default TodoPanel;
