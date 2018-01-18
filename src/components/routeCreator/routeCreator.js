import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './routeCreator.css';

import Points from '../points/points';
import Map from '../map/map';

export default class RouteCreator extends Component {
    render() {
        return(
            <div className="route-creator">
                <Points points={ this.props.points }/>
                <Map lat={-34.397} lng={150.644} />
            </div>
        );
    }
}

RouteCreator.propTypes = {
    points: PropTypes.array.isRequired
};
