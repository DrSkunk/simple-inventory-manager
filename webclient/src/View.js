import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const styles = theme => ({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

class View extends Component {

  itemClick = (e) => {
    console.log("itemClick", e);
  }

  onNodeClick = (path, item) => {
    console.log(path, item);
  }

  mapGroups = (path, groups) => {
    return groups.map(group => {
      return (
        <TreeItem key={group.id} nodeId={group.id} label={group.title}
        >
          {this.mapGroups(path, group.groups)}
          {this.mapItems(path, group.items)}
        </TreeItem>
      );
    });
  }

  mapItems = (path, items) => {
    return items.map(item => {
      return (
        <TreeItem
          key={item.id}
          nodeId={item.id}
          label={item.title}
          onClick={() => this.onNodeClick(path, item)}
        />
      );
    });
  }

  render() {
    const { classes, db } = this.props;
    const views = db.groups ? this.mapGroups("", db.groups) : null;
    return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeToggle={this.itemClick}
      >
        {views}
      </TreeView>
    );
  }
}

export default withStyles(styles)(View);
