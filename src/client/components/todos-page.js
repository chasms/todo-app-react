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
    this.completeAll = this.completeAll.bind(this);
    this.archiveAll = this.archiveAll.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.countActive = this.countActive.bind(this);
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

  /**
  * Complete all active todos
  */
  completeAll() {
    api('PUT', null, this.updateTodos);
  }

  /**
   * Archive all completed todos
   */
  archiveAll() {
    api('PATCH', null, this.updateTodos);
  }

  /**
   * Deletre all archived todos
   */
  deleteAll() {
    api('DELETE', null, this.updateTodos);
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
   * Archive all completed todos
   */
  countActive() {
    var counter = 0
    this.state.todos.forEach( todo => {
      if (todo.status === 'active') {
        counter += 1
      }
    })
    return counter
  }

  renderCounter() {
    let count = this.countActive()
    if (count === 0) {
      return (
        <span className='todo-counter'>
          You have completed all of your tasks!
        </span>
      )
    }
    let counterText = count + (
    count === 1 ? ' task remaining' : ' tasks remaining')
    return (
      <span className='todo-counter'>
        {counterText}
        <Button
          text='Complete All'
          buttonStyle='complete-all'
          onClick={this.completeAll}
        />
    </span>
    )
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
          {this.renderCounter()}
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
