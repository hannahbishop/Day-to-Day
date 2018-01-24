import React from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import PropTypes from 'prop-types';

const propTypes = {
  todos: PropTypes.array.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  swapPanel: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

const TodoPanel = (props) => {
  const complete = props.todos
    .filter(todo => (todo.panelID === props.id && todo.isComplete));
  const incomplete = props.todos
    .filter(todo => (todo.panelID === props.id && !todo.isComplete));
  return (
    <div>
      <TodoForm 
        addTodo = {props.addTodo}
        panelID = {props.id}/>
      <div className = "todo-list__view">
        <TodoList
          className = "todo-list todo-list--incomplete"
          todos = {incomplete}
          handleCheckbox = {props.handleCheckbox}
          removeTodo = {props.removeTodo}
          swapPanel = {props.swapPanel}
        />
        <TodoList
          className = "todo-list todo-list--complete"
          todos = {complete}
          handleCheckbox = {props.handleCheckbox}
          removeTodo = {props.removeTodo}
          swapPanel = {props.swapPanel}
        />
      </div>
    </div>
  )
};

TodoPanel.propTypes = propTypes;

export default TodoPanel;
