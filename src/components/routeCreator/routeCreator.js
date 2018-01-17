import React from 'react';
import PropTypes from 'prop-types';
import './routeCreator.css';

import Points from '../points/points';
import Map from '../map/map';

const RouteCreator = ({ points }) => {
    return(
        <div className="route-creator">
            <Points points={ points }/>
            <Map />
        </div>
    );
};

RouteCreator.propTypes = {
    points: PropTypes.array.isRequired
};

export default RouteCreator;
