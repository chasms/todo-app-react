import React from 'react';
import { Link } from 'react-router';

import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
  archiveAll: React.PropTypes.func,
  deleteAll: React.PropTypes.func,
  existCompleted: React.PropTypes.bool
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  archiveAll: noop,
  deleteAll: noop,
  existCompleted: true,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, archiveAll, deleteAll, existCompleted }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let archivedLinkCls = `${baseCls}__item`;
  archivedLinkCls += filterBy === 'archived' ? ` ${baseCls}__item--active` : '';

  let activeFilter = (filter) => {
    return `${baseCls}__item`
      + (filter === filterBy ? ` ${baseCls}__item--active` : '')
  }

  return (
    <div className={baseCls}>
      <Link
        to="/"
        activeClassName={`${baseCls}__item--active`}
        className={`${baseCls}__item`}
      >
        All
      </Link>
      <Link
        to="/active"
        activeClassName={`${baseCls}__item--active`}
        className={`${baseCls}__item`}
      >
        Active
      </Link>
      <Link
        to="/completed"
        activeClassName={`${baseCls}__item--active`}
        className={`${baseCls}__item`}
      >
        Completed
      </Link>
      <Link
        to="/archived"
        activeClassName={`${baseCls}__item--active`}
        className={`${baseCls}__item`}
      >
        Archived
      </Link>
      {/* {existCompleted ? (
        <Button
          text="Archive All Completed"
          buttonStyle="archive-delete-all"
          onClick={archiveAll}
        />
        ):(
        <Button
          text="Delete All Archived"
          buttonStyle="archive-delete-all"
          onClick={deleteAll}
        />
      )} */}
      <Button
        text="Archive All Completed"
        buttonStyle="archive-delete-all"
        onClick={archiveAll}
      />
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
