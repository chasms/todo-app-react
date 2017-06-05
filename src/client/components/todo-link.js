import React from 'react';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  text: '',
};

/**
 * Link component
 * @returns {ReactElement}
 */
const TodoLink = ({ text }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo-link';

  return (
    <div className={baseCls}>
      {text}
    </div>
  );
};

TodoLink.propTypes = propTypes;
TodoLink.defaultProps = defaultProps;

export default TodoLink;
