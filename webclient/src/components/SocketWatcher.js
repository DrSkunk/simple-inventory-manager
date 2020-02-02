import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default class SocketWatcher extends Component {
  constructor(props) {
    super(props);
    this.props.socket.on('connect', () => {
      this.setState({ connectOpen: true, disconnectOpen: false });
    });
    this.props.socket.on('disconnect', () => {
      this.setState({ connectOpen: false, disconnectOpen: true });
    });
  }

  state = {
    connectOpen: false,
    disconnectOpen: true
  };
  // handleConnectClick = () => {
  //   this.setState({ connectOpen: true });
  // };

  handleConnectClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ connectOpen: false });
  };

  // handleDisconnectClick = () => {
  //   this.setState({ disconnectOpen: true });
  // };

  handleDisconnectClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ disconnectOpen: false });
  };

  render() {
    return (
      <>
        <Snackbar
          open={this.state.connectOpen}
          autoHideDuration={6000}
          onClose={this.handleConnectClose}
        >
          <Alert onClose={this.handleConnectClose} severity="success">
            Socket connected successfully to server!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.disconnectOpen}
          onClose={this.handleDisconnectClose}
        >
          <Alert onClose={this.handleDisconnectClose} severity="error">
            No connection to server.
          </Alert>
        </Snackbar>
      </>
    );
  }
}
