import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../lib/styles.css';
import PxLogin from '../../lib'; // import from built files (run "$ yarn build" first)
// import PxLogin from '../../src/index'; // import directly from source

class Demo extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>px-login demo</h1>
          <PxLogin onSubmit={console.log} />
        </div>
        <div>
          <h1>Advanced demo</h1>
          <PxLogin
            renderTitle={title => <h3>{title}</h3>}
            initialValues={{ username: 'defaultUsername' }}
            onError={console.log}
            onSubmit={console.log}
          />
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#app'));
