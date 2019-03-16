import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../lib/styles.css';
import PxLogin from '../../lib'; // import from built files (run "$ yarn build" first)
// import PxLogin from '../../src/index'; // import directly from source

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>px-login Demo</h1>
        <PxLogin renderTitle={title => <h3>{title}</h3>} onSubmit={console.log} />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#app'));
