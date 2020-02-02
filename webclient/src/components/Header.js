import React, { Component } from 'react';
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
const drawerWidth = 240;

const styles = theme => ({
  appBar: { width: `calc(100% - ${drawerWidth}px)`, marginLeft: drawerWidth }
});

class Header extends Component {
  state = { editingTitle: false };

  render() {
    const { classes, selectedNode, onTitleChange } = this.props;
    const { editingTitle } = this.state;

    let title = null;

    if (!selectedNode) {
      title = 'Simple Inventory Manager';
    } else if (editingTitle) {
      title = (
        <TextField
          id="standard-basic"
          name="title"
          label="Title"
          value={selectedNode.node.title}
          onChange={onTitleChange}
          color="primary"
          InputProps={{
            style: { color: 'white' }
          }}
          InputLabelProps={{
            style: { color: 'white' }
          }}
        />
      );
    } else {
      title = selectedNode.node.title;
    }

    let editSaveTitleButton = null;

    if (selectedNode) {
      if (editingTitle) {
        editSaveTitleButton = (
          <IconButton
            aria-label="Save edited title"
            color="inherit"
            onClick={() => this.setState({ editingTitle: false })}
          >
            <Badge>
              <DoneIcon />
            </Badge>
          </IconButton>
        );
      } else {
        editSaveTitleButton = (
          <IconButton
            aria-label="Edit title"
            color="inherit"
            onClick={() => this.setState({ editingTitle: true })}
          >
            <Badge>
              <EditIcon />
            </Badge>
          </IconButton>
        );
      }
    }
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          {editSaveTitleButton}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
