import React from 'react';
import PropTypes from 'prop-types';

const PointSearch = ({ addPoint }) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();
        let input = event.target.children["newPoint"];
        addPoint(input.value);
        input.value = null;
    };

    return(
        <div>
            <form onSubmit={ handleFormSubmit }>
                <input type="text" name="newPoint" />
            </form>
        </div>
    );
};

PointSearch.propTypes = {
    addPoint: PropTypes.func.isRequired
};

export default PointSearch;
