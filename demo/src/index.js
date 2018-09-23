import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../src/px-login/styles.css';
import Example from '../../src';

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>px-login Demo</h1>
        <Example />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#app'));
