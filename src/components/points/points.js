import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './points.css';

import PointSearch from '../../containers/PointSearch';
import PointsList from './pointsList/pointsList';

export default class Points extends Component {
    render() {
        let { mapApi, map, points, onAddPoint, onDeletePoint, onDropPoint } = this.props;

        return(
            <div className="points">
                <PointSearch mapApi={ mapApi } map={ map }
                             onAddPoint={ onAddPoint } />
                <PointsList mapApi={ mapApi } map={ map } points={ points }
                            onDeletePoint={ onDeletePoint }
                            onDropPoint={ onDropPoint } />
            </div>
        );
    }
};

Points.propTypes = {
    mapApi: PropTypes.object.isRequired,
    onAddPoint: PropTypes.func.isRequired,
    onDeletePoint: PropTypes.func.isRequired,
    onDropPoint: PropTypes.func.isRequired
};
