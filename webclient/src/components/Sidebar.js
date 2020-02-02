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

class Sidebar extends Component {
  state = {
    selectedNode: null
  };
  onNodeSelect = (path, node, type) => {
    console.log(path, node, type);
    this.props.selectNode(type, path, node);
  };

  mapGroups = (path, groups) => {
    return groups.map(group => {
      const newPath = path ? `${path}.${group.id}` : group.id;
      return (
        <TreeItem
          key={group.id}
          nodeId={group.id}
          label={group.title}
          onClick={() => this.onNodeSelect(newPath, group, 'group')}
        >
          {this.mapGroups(newPath, group.groups)}
          {this.mapItems(newPath, group.items)}
        </TreeItem>
      );
    });
  };

  mapItems = (path, items) => {
    return items.map(item => {
      return (
        <TreeItem
          key={item.id}
          nodeId={item.id}
          label={item.title}
          onClick={() => this.onNodeSelect(path + item.id, item, 'item')}
        />
      );
    });
  };

  render() {
    const { classes, db } = this.props;
    const views = db.groups ? this.mapGroups('', db.groups) : null;
    return (
      <div>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          // onNodeToggle={this.itemClick}
        >
          {views}
        </TreeView>
        {/* <div>
          <pre>{JSON.stringify(this.state.selectedNode, null, 2)}</pre>
        </div> */}
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
