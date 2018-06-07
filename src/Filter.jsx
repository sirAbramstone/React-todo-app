import React from 'react';

const Filter = ({ changeFilter }) => {
  return (
    <div>
      <select onChange={changeFilter}>
        <option value="All">Все</option>
        <option value="Important">Важные</option>
        <option value="Regular">Обычные</option>
      </select>
    </div>
  );
};

export default Filter;
