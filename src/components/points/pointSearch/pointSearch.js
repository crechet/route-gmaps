import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pointSearch.css';

class PointSearch extends Component {
    constructor(props) {
        super(props);
        this.placeholder = 'Поиск точки';
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        this.searchInput.focus();
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.searchInput.value);
        this.props.addPoint(this.searchInput.value);
        this.searchInput.value = null;
    }

    render() {
        return (
            <div className="point-search">
                <form onSubmit={ this.handleFormSubmit } className="form">
                    <div className="form-control">
                        <input type="text" className="input" name="newPoint" autoComplete="off"
                               placeholder={ this.placeholder }
                               ref={ (input) => { this.searchInput = input; } } />
                    </div>
                </form>
            </div>
        );
    }
}

PointSearch.propTypes = {
    addPoint: PropTypes.func.isRequired
};

export default PointSearch;
