import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

class DragBox extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget, color } = this.props;
    return connectDropTarget(
      connectDragSource(
        <div className="box" style={{ backgroundColor: color }}></div>
      )
    );
  }
}

const specSource = {
  beginDrag(props) {
    // console.log('beginDrag', props);
    return {
      index: props.index
    };
  },
};

const specTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    if (props.onRowDrop) {
      props.onRowDrop(dragIndex, hoverIndex);
    }
  },
};

function collectSource(connect) {
  return {
    connectDragSource: connect.dragSource(),
  };
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver,
  };
}

const DragSourceBox = DragSource('box', specSource, collectSource)(DragBox);
const DropTargetBox = DropTarget(
  'box',
  specTarget,
  collectTarget
)(DragSourceBox);

export default DropTargetBox;
