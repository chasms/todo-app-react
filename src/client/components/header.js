import React from 'react';
import { Link } from 'react-router';

/**
 * Header component
 */
const Header = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'header';

  return (
    <div className={baseCls}>
      <Link
        to="/"
        activeClassName={`${baseCls}__item`}
        className={`${baseCls}__item`}
      >
        MyTodos
      </Link>
    </div>
  )
};

export default Header;
