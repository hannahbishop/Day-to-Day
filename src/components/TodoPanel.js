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
          <Droppable droppableId={props.id.toString() + ".0" }>
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                <TodoList
                  className = "todo-list todo-list--incomplete"
                  todos = {incomplete}
                  handleCheckbox = {props.handleCheckbox}
                  removeTodo = {props.removeTodo}
                  swapPanel = {props.swapPanel}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId={props.id.toString() + ".1" }>
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                <TodoList
                  className = "todo-list todo-list--complete"
                  todos = {complete}
                  handleCheckbox = {props.handleCheckbox}
                  removeTodo = {props.removeTodo}
                  swapPanel = {props.swapPanel}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
      </div>
    </div>
  )
};

<Droppable droppableId="droppable-1" type="PERSON">
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
    >
      <h2>I am a droppable!</h2>
      {provided.placeholder}
    </div>
  )}
</Droppable>;

TodoPanel.propTypes = propTypes;

export default TodoPanel;
