import React from 'react';
import PropTypes from 'prop-types';

import Points from '../points/points';

const RouteCreator = ({ points }) => {
    return(
        <div>
            <p>Route Creator Component</p>
            <Points points={ points }/>
        </div>
    );
};

RouteCreator.propTypes = {
    points: PropTypes.array.isRequired
};

export default RouteCreator;
