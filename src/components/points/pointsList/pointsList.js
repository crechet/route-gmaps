import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import _ from 'lodash';

import './pointsList.css';

import Point from '../point/point';

class PointsList extends Component {
    renderPoints() {
        let { points, onDeletePoint, onDropPoint } = this.props;

        return _.map(points, (point) => {
            return <Point key={ point.id }
                          point={ point }
                          onDeletePoint={ onDeletePoint }
                          onDropPoint={ onDropPoint } />;
        });
    };

    render() {
        return(
            <ul className="points-list">
                { this.renderPoints() }
            </ul>
        );
    }
}

PointsList.propTypes = {
    points: PropTypes.array.isRequired,
    onDeletePoint: PropTypes.func.isRequired,
    onDropPoint: PropTypes.func.isRequired
};

export default DragDropContext(HTML5Backend)(PointsList);
