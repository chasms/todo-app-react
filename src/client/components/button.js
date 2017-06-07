import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: React.PropTypes.func,
  buttonStyle: React.PropTypes.string,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  buttonStyle: React.PropTypes.string,
  text: '',
};

/**
 * Button component
 * @returns {ReactElement}
 */
const Button = ({ text, buttonStyle, onClick }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'button';

  return (
    <button className={baseCls + ' ' + baseCls + '--' + buttonStyle} onClick={onClick}>
      {text}
    </button>
  )
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
