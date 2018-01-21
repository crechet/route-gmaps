import React from 'react';

import './point.css';

export default ({ point }) => {
    return(
        <li className="point">{ point.name }</li>
    );
};
