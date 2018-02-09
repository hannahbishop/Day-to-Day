import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  todos: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

const TodoPanel = props => {
  const getListStyle = (isDraggingOver) => ({
    padding: '1rem 1rem 1rem 1rem',
    minHeight: '4rem',
  });

  const lists = [];
  [0,1].forEach((i) => {
    lists.push(
      <li 
        key = {i}
        className = {
          "todo-list " +
          (i ? "todo-list--complete" : "todo-list--incomplete" )} 
      >
        <Droppable
          droppableId={props.id.toString() + " " + i.toString()}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              <TodoList
                todos = {props.todos.filter(todo => +todo.isComplete === i)}
                index = {i}
                handleCheckbox = {props.handleCheckbox}
                removeTodo = {props.removeTodo}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable> 
      </li>
    )
  });

  return (
    <div>
      <TodoForm 
        addTodo = {props.addTodo}
        panel = {props.id}
      />
      <ul className = "todo-list__view">{lists}</ul>
    </div>
  )
};

TodoPanel.propTypes = propTypes;

export default TodoPanel;
