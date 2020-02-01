import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import io from 'socket.io-client';
import { getConfig, addItem } from './model/';
import { type } from './model/types';
import View from './View';

const styles = theme => ({
  root: {}
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
    file: null
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

  click = () => {
    //this.socket.binary(true).emit('uploadImage');
    // addItem('living.items.keuken.items', {
    //   type: type.generic,
    //   title: 'hoiqsdf',
    //   description: 'description',
    //   price: 'price',
    //   picture: 'picture',
    //   url: null
    // }).then(res => console.log('addItem res', res));
  };

  render() {
    const { classes } = this.props;
    const { db } = this.state;
    return (
      <div className={classes.root}>
        roboto test<Button onClick={this.click}>test</Button>
        <input type="file" onChange={this.onChange} />
        <View db={db} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
