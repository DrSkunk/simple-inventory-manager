import React, { Component } from 'react';
import io from 'socket.io-client';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Sidebar from './components/Sidebar';
import Node from './components/Node';
import SocketWatcher from './components/SocketWatcher';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
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
    console.log(this.socket);
    this.socket.on('config', config => {
      console.log('Received new db state', config);
      this.setState({ db: config });
    });
  }
  state = {
    db: {},
    selectedNode: null
  };

  onChange = e => {
    const blob = e.target.files[0];
    console.log(blob);
    const toSend = {
      path: 'fs0yg4H-alN5IA3_Qwzho.iJy6-b2OhPLO1SNtSPG_D.7WaS_e0PTayfyagS_IrAI',
      item: {
        title: 'title',
        description: 'desc',
        barcode: '12345',
        price: '35',
        currency: 'EUR',
        url: null,
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

  render() {
    const { classes } = this.props;
    const { db, selectedNode } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              {selectedNode
                ? selectedNode.node.title
                : 'Simple Inventory Manager'}
            </Typography>
          </Toolbar>
        </AppBar>
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
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Node node={selectedNode} />
          <SocketWatcher socket={this.socket} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
