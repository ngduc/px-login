import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../src/PxLogin.css';
import PxLogin from '../../lib';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>px-login Demo</h1>
        <PxLogin renderTitle={title => <h3>{title}</h3>} />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#app'));
