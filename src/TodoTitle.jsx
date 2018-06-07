import React from 'react';

const TodoTitle = ({ todos }) => {
  return (
    <div>
      <h2>Todo-App</h2>
      <h4>
        Сейчас в списке: <i>{todos.length}</i> задача(и).
      </h4>
    </div>
  );
};

export default TodoTitle;
