import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pointSearch.css';

class PointSearch extends Component {
    constructor(props) {
        super(props);
        this.placeholder = 'Поиск точки';
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.initPointSearch = this.initPointSearch.bind(this);

        this.state = {
            place: null,
            position: null
        }
    };

    componentDidMount() {
        // Focus user to input field.
        this.searchInput.focus();
        this.initPointSearch();
    }

    initPointSearch() {
        let { mapApi, map } = this.props;
        if (!mapApi || !map) return false;

        // Add autocomplete functionality to input field.
        let autocomplete = new mapApi.maps.places.Autocomplete(this.searchInput);
        autocomplete.bindTo('bounds', map);

        // On place selected.
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        // this.props.addPoint(this.searchInput.value);
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
