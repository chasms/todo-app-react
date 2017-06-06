import React from 'react';

import Header from './header';
import TodosPage from './todos-page';

// /**
//  * Prop Types
//  * @private
//  */
// const propTypes = {
//   children: React.PropTypes.oneOfType([
//     React.PropTypes.arrayOf(React.PropTypes.node),
//     React.PropTypes.node
//   ]),
// };

/**
 * App component
 * @returns {ReactElement}
 */
const App = ({ params }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'app';

  return (
    <div className={baseCls}>
      <Header />
      <TodosPage filterBy={params.filter || 'all'}/>
    </div>
  );
};

// App.propTypes = propTypes;

export default App;
