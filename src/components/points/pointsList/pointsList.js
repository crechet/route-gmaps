import React from 'react';
import _ from 'lodash';
import Point from '../point/point';

export default ({ points }) => {
    const renderPoints = () => {
        return _.map(points, (point) => {
            return <Point key={ point.id } point={ point } />;
        });
    };

    return(
        <ul>
            { renderPoints() }
        </ul>
    );
}