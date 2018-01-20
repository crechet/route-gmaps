import React, { Component } from 'react';
import googleMapAPIComponent from '../googleMapAPIComponent';
// import PropTypes from 'prop-types';

import './routeCreator.css';

import Points from '../points/points';
import Map from '../map/map';

export class RouteCreator extends Component {
    render() {
        return(
            <div className="route-creator">
                <Points points={ this.props.points }/>
                <Map mapApi={ this.props.mapApi } lat={-34.397} lng={150.644} zoom={8} />
            </div>
        );
    }
}

RouteCreator.propTypes = {
    // points: PropTypes.array.isRequired
};

export default googleMapAPIComponent(RouteCreator);
