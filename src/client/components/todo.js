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
const Todo = ({
  filtered,
  onClickDelete,
  onClickCheck,
  onClickArchive,
  status,
  text }) => {
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
          buttonStyle="archive"
          onClick={onClickArchive}
        />
      )
    }
  }

  const renderCheckbox = () => {
    if (status !== 'archived') {
      return (
        <input
          className={baseCls + '--checkbox'}
          type="checkbox"
          onChange={onClickCheck}
          checked={status === 'completed'}>
        </input>
      )
    } else {
      return (
        <div className="todo--checkbox-placeholder"></div>
      )
    }
  }

  return (
    <li className={todoCls}>
      {renderCheckbox()}
      <TodoLink
        text={text}
      />
      <div className='button--bar'>
        {renderArchiveButton()}
        <Button
          text="×"
          buttonStyle="delete"
          onClick={onClickDelete}
        />
      </div>
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
