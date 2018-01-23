import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { DND_POINT } from '../../../constants';

import './point.css';

// Specifies the Point Drag Source. Describe how Drag Source reacts on DnD event.
const pointSource = {
    beginDrag(props) {
        console.log('begin drag point props', props);
        let { point } = props;
        return {
            sourcePointId: point.id
        };
    }
};

/**
 * Specifies which props to inject into your component for Drag Source.
 * @ connect - function that assign specified role: (Drag Source, Drop Target, Drag preview) to the component.
 * @ monitor - watching for current DnD state and injects it's data to component props.
 * */
function collectSource(connect, monitor) {
    return {
        // Specify as drag source.
        connectDragSource: connect.dragSource(),
        // Whether it is currently being dragged.
        isDragging: monitor.isDragging()
    };
}

// Specifies the Point Drop Target. Describes how Drop Target reacts on DnD events.
const pointTarget = {
    drop(targetProps, monitor) {
        let { sourcePointId } = monitor.getItem();
        let { point, onDropPoint } = targetProps;

        // If Point was dropped on new target.
        if (sourcePointId !== point.id) {
            onDropPoint(sourcePointId, point.id);
        }
    }
};

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        // Whether the pointer is currently over the target to highlight it.
        isOver: monitor.isOver()
    };
}

class Point extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.state = {
            point: {}
        };
    }

    componentDidMount() {
        let { point } = this.props;
        this.setState({ point });
    }

    handleDeleteClick() {
        let { onDeletePoint, point } = this.props;
        onDeletePoint(point.id);
    }

    render() {
        let { point } = this.props;
        const { isDragging, isOver, highlighted, connectDragSource, connectDropTarget, text } = this.props;

        let pointStyle = {
            opacity: isDragging ? 0.5 : 1
        };

        let pointClassName = ['point'];
        if (isOver) pointClassName.push('point_is-over-target');
        if (isDragging) pointClassName.push('point_is-dragging');
        pointClassName = pointClassName.join(' ');

        return(
            connectDragSource(
                connectDropTarget(
                    <li className={pointClassName} style={pointStyle}>
                        <p className="point-info">{ point.name }</p>
                        <p className="cross icon-cross" onClick={ this.handleDeleteClick }></p>
                    </li>
                )
            )
        );
    }
}

Point.propTypes = {
    point: PropTypes.object.isRequired,
    onDeletePoint: PropTypes.func.isRequired,
    onDropPoint: PropTypes.func.isRequired,
    // Injected by React DnD.
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

// export default Point;
export default DropTarget(DND_POINT, pointTarget, collectTarget)(DragSource(DND_POINT, pointSource, collectSource)(Point));
