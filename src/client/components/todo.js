import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
  onClickCheck: React.PropTypes.func,
  onClickArchive: React.PropTypes.func,
  status: React.PropTypes.string,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickCheck: noop,
  onClickArchive: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickCheck, onClickArchive, status, text }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    + (status === 'completed' ? ' todo--status-completed' : '')
    + (status === 'archived' ? ' todo--status-archived' : '')
    + (filtered ? ' todo--filtered' : '');

  const renderArchiveButton = () => {
    if (status === 'completed') {
      return (
        <Button
          text="Archive"
          onClick={onClickArchive}
        />
      )
    }
  }

  return (
    <li className={todoCls}>
      <input
        type="checkbox"
        onChange={onClickCheck}
        checked={status === 'completed'}>
      </input>
      <TodoLink
        text={text}
      />
      {renderArchiveButton()}
      <Button
        text="Delete"
        onClick={onClickDelete}
      />
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
