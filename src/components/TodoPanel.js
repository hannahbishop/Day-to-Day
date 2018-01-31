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
};

const TodoPanel = props => {
  const lists = [];
  [0,1].forEach((i) => {
    lists.push(
      <Droppable key={i} droppableId={props.id.toString() + " " + i.toString()}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            <TodoList
              className = "todo-list"
              todos = {props.todos.filter(todo => +todo.isComplete === i)}
              index = {i}
              handleCheckbox = {props.handleCheckbox}
              removeTodo = {props.removeTodo}
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
        panel = {props.id}
      />
      <div className = "todo-list__view">{lists}</div>
    </div>
  )
};

TodoPanel.propTypes = propTypes;

export default TodoPanel;
