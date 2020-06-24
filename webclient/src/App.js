import React, { Component } from 'react';
import io from 'socket.io-client';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Node from './components/Node';
import SocketWatcher from './components/SocketWatcher';
import Header from './components/Header';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8080');
    this.socket.on('inventory', config => {
      console.log('Received new db state', config);
      this.setState({ db: config });
    });
  }
  state = {
    db: {},
    selectedNode: null
  };

  onInputChange = e => {
    const blob = e.target.files[0];
    console.log(blob);
    const toSend = {
      path: 'fs0yg4H-alN5IA3_Qwzho.iJy6-b2OhPLO1SNtSPG_D',
      item: {
        title: 'title',
        description: 'desc',
        barcode: '12345',
        price: 35,
        currency: 'EUR',
        url: '',
        files: [],
        pictures: [{ filename: blob.name, blob }]
      }
    };
    console.log('addItem', toSend);

    this.socket.emit('addItem', toSend);
  };

  selectNode = (type, path, node) => {
    this.setState({ selectedNode: { type, path, node } });
  };

  onChange = event => {
    const { name, value } = event.target;
    console.log('onchange', name, value);
    this.setState(state => ({
      selectedNode: { node: { ...state.selectedNode.node, [name]: value } }
    }));
  };

  render() {
    const { classes } = this.props;
    const { db, selectedNode } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header selectedNode={selectedNode} onTitleChange={this.onChange} />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <Sidebar db={db} selectNode={this.selectNode} />
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <input type="file" onChange={this.onInputChange} />
          <Node node={selectedNode} onChange={this.onChange} />
          <SocketWatcher socket={this.socket} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
