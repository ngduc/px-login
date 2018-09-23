import React, { Component } from 'react';

import PxLogin from './px-login';

export default class extends Component {
  render() {
    return (
      <div>
        <PxLogin renderTitle={title => <h3>{title}</h3>} />
      </div>
    );
  }
}
