import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Point from '../point/point';

export default class PointsList extends Component {
    renderPoints() {
        let { points, onDeletePoint } = this.props;

        return _.map(points, (point) => {
            return <Point key={ point.id } point={ point } onDeletePoint={ onDeletePoint } />;
        });
    };

    render() {
        return(
            <ul>
                { this.renderPoints() }
            </ul>
        );
    }
}

PointsList.propTypes = {
    points: PropTypes.array.isRequired,
    onDeletePoint: PropTypes.func.isRequired
};