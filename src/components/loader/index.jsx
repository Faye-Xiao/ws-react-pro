import React, { Component } from 'react';
import Loading from 'components/loading';

class loader extends Component {
  constructor(props) {
    super(props);
    this.state = { enable: false };
  }

  setStatus(status) {
    this.setState({
      enable: status
    });
  }

  render() {
    return (
      this.state.enable && <Loading size='xs' />
    );
  }
}



export default loader;
