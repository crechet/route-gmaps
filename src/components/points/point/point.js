import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './point.css';

export default class Point extends Component{
    constructor(props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.state = {
            point: {}
        };
    }

    componentDidMount() {
        let { point } = this.props;
        this.setState({ point });
    }

    handleDeleteClick() {
        let { onDeletePoint, point } = this.props;
        onDeletePoint(point);
    }

    render() {
        let { point } = this.props;

        return(
            <li className="point">
                <p>{ point.name }</p>
                <p onClick={ this.handleDeleteClick }>x</p>
            </li>
        );
    }
};

Point.propTypes = {
    point: PropTypes.object.isRequired,
    onDeletePoint: PropTypes.func.isRequired
};
