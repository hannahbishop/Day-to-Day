import React from 'react';

const TodoForm = props => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button onClick={() => {
        props.addTodo(input.value);
        input.value = '';
      }}>
        +
      </button>
    </div>
  );
};

export default TodoForm;
