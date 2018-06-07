import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item.id,
      title: this.props.item.title,
      text: this.props.item.text,
      completed: this.props.item.completed,
      important: this.props.item.important,
      isEdit: false
    };
  }

  toggleCompleted = () => {
    this.setState(
      {
        completed: !this.state.completed
      }
    );
  };

  toggleImportant = () => {
    this.setState(
      {
        important: !this.state.important
      }
    );
  };

  changeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  changeText = event => {
    this.setState({
      text: event.target.value
    });
  };

  toggleEdit = () => {
    this.setState(prevState => {
      return { isEdit: !prevState.isEdit };
    });
  };

  editTodo = () => {
    const change = {
      id: this.state.id,
      title: this.state.title,
      text: this.state.text,
      completed: this.state.completed,
      important: this.state.important
    };
    this.setState({
      isEdit: false
    });
    this.props.update(change);
  };

  render() {
    const isComplete = this.state.completed ? 'complete' : '';

    return (
      <li>
        {this.state.isEdit ? (
          <div>
            <input
              type="text"
              value={this.state.title}
              onChange={this.changeTitle}
            />
            <textarea value={this.state.text} onChange={this.changeText} />
            <label>
              Это важно<input
                type="checkbox"
                checked={this.state.important}
                onChange={this.toggleImportant}
              />
            </label>
            <label>
              Выполнено<input
                type="checkbox"
                checked={this.state.completed}
                onChange={this.toggleCompleted}
              />
            </label>
            <button onClick={this.editTodo}>Сохранить</button>
            <button id="removebtn" onClick={this.props.remove}>
              Удалить
            </button>
          </div>
        ) : (
          <div className={isComplete}>
            <h3>{this.state.title}</h3>
            <p>{this.state.text}</p>
            <button onClick={this.toggleEdit}>Редактировать</button>
            <button id="removebtn" onClick={this.props.remove}>
              Удалить
            </button>
          </div>
        )}
      </li>
    );
  }
}

Todo.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool,
      important: PropTypes.bool
    })
  ).isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};
