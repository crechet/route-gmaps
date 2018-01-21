import React, { Component } from 'react';
import googleMapAPIComponent from '../googleMapAPIComponent';
// import PropTypes from 'prop-types';

import './routeCreator.css';

// import Points from '../points/points';
import Map from '../map/map';

export class RouteCreator extends Component {
    render() {
        let { mapApi, points } = this.props;

        if (!mapApi) {
            return( <div className="route-creator">Google Map loading...</div> );
        } else {
            return(
                <div className="route-creator">
                    {/*<Points mapApi={ mapApi } points={ points }/>*/}
                    <Map mapApi={ mapApi } lat={59.9403958} lng={30.31379620000007} zoom={8}></Map>
                </div>
            );
        }
    }
}

RouteCreator.propTypes = {
    // points: PropTypes.array.isRequired,
    // mapApi: PropTypes.object
};

export default googleMapAPIComponent(RouteCreator);
