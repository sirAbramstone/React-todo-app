import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: ''
    };
  }

  handleChangeInput = (key, event) => {
    const inputsValue = {
      title: this.state.title,
      text: this.state.text
    };

    inputsValue[key] = event.target.value;

    this.setState(inputsValue);
  }

  handleAddTodo = event => {
    event.preventDefault();

    const newItem = {
      title: this.state.title,
      text: this.state.text
    };

    this.props.add(newItem);

    this.setState({
      title: '',
      text: ''
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Добавьте заголовок"
          value={this.state.title}
          onChange={event => this.handleChangeInput('title', event)}
        />
        <textarea
          value={this.state.text}
          placeholder="Добавьте описание"
          onChange={event => this.handleChangeInput('text', event)}
        />
        <button type="submit" onClick={this.handleAddTodo}>
          Добавить задачу
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  add: PropTypes.func.isRequired
};
