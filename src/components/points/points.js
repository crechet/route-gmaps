import React from 'react';

import PointSearch from '../../containers/PointSearch';
import PointsList from './pointsList/pointsList';

export default ({ points }) => {
    return(
        <div>
            <p>Points Component</p>
            <PointSearch />
            <PointsList points={ points }/>
        </div>
    );
};


