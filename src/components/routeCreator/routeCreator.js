import React, { Component } from 'react';
import googleMapAPIComponent from '../googleMapAPIComponent';
import PropTypes from 'prop-types';

import './routeCreator.css';

import Map from '../map/map';

export class RouteCreator extends Component {
    render() {
        let { mapApi } = this.props;
        console.log('RouteCreator props', this.props);

        if (!mapApi) {
            return( <div className="route-creator">Google Map loading...</div> );
        } else {
            return(
                <div className="route-creator">
                    <Map mapApi={ mapApi } lat={59.9403958} lng={30.31379620000007} zoom={8}></Map>
                </div>
            );
        }
    }
}

RouteCreator.propTypes = {
    mapApiLoaded: PropTypes.bool,
    mapApi: PropTypes.object
};

export default googleMapAPIComponent(RouteCreator);
