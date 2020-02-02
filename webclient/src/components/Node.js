import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import ItemTable from './ItemTable';

const styles = theme => ({
  root: {}
});

class Node extends Component {
  onChange = event => {
    this.props.onChange(event);
  };

  render() {
    const { node, classes } = this.props;
    if (!node) {
      return null;
    }
    return <ItemTable items={node.node.items} />;
    // return (
    //   <form className={classes.root} noValidate autoComplete="off">
    //     <TextField
    //       id="standard-basic"
    //       name="description"
    //       label="Description"
    //       value={node.node.description}
    //       onChange={this.onChange}
    //     />
    //   </form>
    // );
    // return <pre>{JSON.stringify(node, null, 2)}</pre>;
  }
}

export default withStyles(styles)(Node);
