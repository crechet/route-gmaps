import React from 'react';

import './points.css';

import PointSearch from '../../containers/PointSearch';
import PointsList from './pointsList/pointsList';

export default ({ points }) => {
    return(
        <div className="points">
            <PointSearch />
            <PointsList points={ points }/>
        </div>
    );
};


