import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { type } from './model/types';

const styles = theme => ({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

function mapItems(items) {
  return Object.values(items).map(item => {
    if (item.type === type.group) {
      return (
        <TreeItem key={item.title} nodeId={item.title} label={item.title}>
          {mapItems(item.items)}
        </TreeItem>
      );
    }
    return (
      <TreeItem
        key={item.title}
        nodeId={item.title}
        label={item.title}
      ></TreeItem>
    );
  });
}

class View extends Component {
  render() {
    const { classes, db } = this.props;

    const views = mapItems(db);
    return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {views}
        {/* <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="6" label="Material-UI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem> */}
      </TreeView>
    );
  }
}

export default withStyles(styles)(View);
