import React from 'react';

import { api } from '../helpers/api';
import Todo from './todo';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
  todos: React.PropTypes.arrayOf(React.PropTypes.object),
  updateTodos: React.PropTypes.func,
  loaded: React.PropTypes.bool,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  todos: [],
  updateTodos: noop,
  loaded: false,
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, updateTodos, loaded }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todos';

  /**
   * Click handler for clicking on delete button
   * Deletes todo
   *
   * @param {object} todo - Todo object
   */
  const onClickDelete = todo => {
    api('DELETE', todo, updateTodos);
  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  const onClickCheck = todo => {
    api('PUT', todo, updateTodos);
  }

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  const onClickArchive = todo => {
    api('PATCH', todo, updateTodos);
  }

  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
  const renderTodos = () => {
    return todos.map(todo => {
      let filtered = todo.status !== filterBy
      if (filterBy === '') {
        filtered = false
      }
      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={onClickDelete.bind(this, todo)}
          onClickCheck={onClickCheck.bind(this, todo)}
          onClickArchive={onClickArchive.bind(this, todo)}
          status={todo.status}
          text={todo.text}
        />
      );
    })
  }

  const placeholder = () => {
    if (!loaded) {
      return loaded
    }
    if (todos.length === 0) {
      return (
        <span className={baseCls + '-placeholder'}>
          Congrats, you've completed all of your todos!
        </span>
      )
    } else if (filterBy && todos.findIndex( todo => todo.status === filterBy) === -1) {
      return (
        <span className={baseCls + '-placeholder'}>
          {`You currently have no ${filterBy} todos.`}
        </span>
      )
    } else return false
  }

  let banner = placeholder()

  return ( banner ?
    banner
    :
    <ul className={baseCls}>
      {renderTodos()}
      <li className={baseCls + '-spacer'}></li>
    </ul>
  )
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;
