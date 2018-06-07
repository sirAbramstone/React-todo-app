import React from 'react';
import { render } from 'react-dom';

import TodoList from './TodoList';
import './style.css';

const todos = [
  {
    id: -3,
    title: 'Это Todo-list',
    text: 'Щелчком по чекбоксу (в панеле редактирования) можно отметить задачу "важной".',
    completed: false,
    important: false
  },
  {
    id: -2,
    title: 'Взаимодействие с пользователями',
    text: 'Щелчком по чекбоксу (в панеле редактирования) можно отметить выполнение задачи.',
    completed: true,
    important: false
  },
  {
    id: -1,
    title: 'Сохранение данных',
    text: 'Данные хранятся в localStorage.',
    completed: false,
    important: true
  }
];

render(<TodoList todos={todos} />, document.getElementById('container'));
