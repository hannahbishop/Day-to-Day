import React from 'react';
import Todo from './Todo';

const TodoCard = (props) => {
  return(
    <div class="todo-card">
      <Todo
        todo = { props.todo }
        key = { props.todo }
        removeTodo = { props.removeTodo }
      />
    </div>
  )
}

export default TodoCard;
