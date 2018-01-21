import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';

import './points.css';

import PointSearch from '../../containers/PointSearch';
import PointsList from './pointsList/pointsList';

export default class Points extends Component {
    constructor(props) {
        super(props);

        // this.handleAddPoint = this.handleAddPoint.bind(this);

        /*this.state = {
            points: {},
        };*/
    }

    render() {
        let { mapApi, map, onAddPoint, points } = this.props;

        return(
            <div className="points">
                <PointSearch mapApi={ mapApi } map={ map } onAddPoint={ onAddPoint } />
                <PointsList mapApi={ mapApi } map={ map } points={ points }/>
            </div>
        );
    }
};

Points.propTypes = {
    mapApi: PropTypes.object.isRequired,
    onAddPoint: PropTypes.func.isRequired
};
