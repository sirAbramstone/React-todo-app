import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TodoTitle from './TodoTitle';
import Todo from './Todo';
import Filter from './Filter';
import TodoForm from './TodoForm';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    const localData = localStorage.todos && JSON.parse(localStorage.todos);

    this.state = {
      todos: localData || this.props.todos,
      filter: 'All'
    };
  }

  componentDidMount() {
    localStorage.clear();
    if (!localStorage.todos) {
      localStorage.todos = JSON.stringify(this.state.todos);
    }
  }

  updateLocalStorage() {
    localStorage.todos = JSON.stringify(this.state.todos);
  }

  handleChangeFilter = event => {
    this.setState(
      {
        filter: event.target.value
      },
      () => {
        this.updateLocalStorage();
      }
    );
  };

  addTodo(newItem) {
    const newTodo = {
      id: new Date().getTime(),
      title: newItem.title,
      text: newItem.text,
      completed: false,
      important: false
    };

    if (!newTodo.title || !newTodo.text) {
      alert('Заполните все поля, пожалуйста');
      return false;
    }

    this.setState(
      prevState => {
        return { todos: [...prevState.todos, newTodo] };
      },
      () => {
        this.updateLocalStorage();
      }
    );

    console.log(this.state.todos);
  }

  removeTodo(id) {
    const newTodos = this.state.todos.filter(todo => todo.id !== id);

    this.setState(
      {
        todos: newTodos
      },
      () => {
        this.updateLocalStorage();
      }
    );
  }

  updateTodo(obj, id) {
    // if (JSON.stringify(obj) === JSON.stringify(this.state.todos[index])) {
    //   return false;
    // }
    const items = this.state.todos.filter(todo => todo.id !== id);

    const changedTodo = {
      id: obj.id,
      title: obj.title,
      text: obj.text,
      important: obj.important,
      completed: obj.completed
    };

    this.setState(
      {
        todos: [changedTodo, ...items]
      },
      () => {
        this.updateLocalStorage();
      }
    );
  }

  render() {
    const filteredTodos = this.state.todos.filter(todo => {
      const filter = this.state.filter;
      switch (filter) {
        case 'All':
          return todo;
        case 'Important':
          return todo.important;
        case 'Regular':
          return !todo.important;
        default:
          return todo;
      }
    });

    const items = filteredTodos.map((item) => {
      return (
        <Todo
          item={item}
          key={item.id}
          remove={() => this.removeTodo(item.id)}
          update={obj => this.updateTodo(obj, item.id)}
        />
      );
    });

    return (
      <div>
        <TodoTitle todos={filteredTodos} />
        <TodoForm add={obj => this.addTodo(obj)} />
        <Filter changeFilter={this.handleChangeFilter} />
        <ul>{items}</ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool,
        important: PropTypes.bool
      })
    )
  ).isRequired
};
