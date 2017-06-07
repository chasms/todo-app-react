import React from 'react';
import { Link } from 'react-router';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    filterBy: React.PropTypes.string,
  };

  /**
   * Default Props
   * @private
   */
  static defaultProps = {
    filterBy: '',
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor() {
    super();

    this.state = {
      todos: [],
      loaded: false,
    };

    this.addTodo = this.addTodo.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.archiveAll = this.archiveAll.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }
    api('POST', { text }, this.updateTodos);
  }

  archiveAll() {
    api('PATCH', null, this.updateTodos);
  }

  /**
   * Update todos array state
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  updateTodos(json) {
    this.setState({
      todos: [...json],
      loaded: true,
    });
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className={TodosPage.baseCls}>
        <Navbar
          filterBy={this.props.filterBy}
          archiveAll={this.archiveAll}
        />
        <div className="container">
          <TodoForm
            filterBy={this.props.filterBy}
            onSubmit={this.addTodo}
          />
          <Todos
            filterBy={this.props.filterBy}
            todos={this.state.todos}
            updateTodos={this.updateTodos}
            loaded={this.state.loaded}
          />
        </div>
      </div>
    );
  }
}

export default TodosPage;
