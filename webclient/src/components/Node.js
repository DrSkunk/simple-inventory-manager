import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const styles = theme => ({
  root: {}
});

class Node extends Component {
  render() {
    const { node, classes } = this.props;
    if (!node) {
      return node;
    }
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Title" value={node.node.title} />
      </form>
    );
    // return <pre>{JSON.stringify(node, null, 2)}</pre>;
  }
}

export default withStyles(styles)(Node);
