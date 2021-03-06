import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './pointSearch.css';

class PointSearch extends Component {
    constructor(props) {
        super(props);
        this.placeholder = 'Поиск места...';
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
        let { mapApi, map, onAddPoint } = this.props;
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

            onAddPoint(place);

            this.setState({
                place: place,
                position: place.geometry.location
            });

            // Clear input field.
            this.searchInput.value = null;
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="point-search">
                <form onSubmit={ this.handleFormSubmit } className="form">
                    <div className="form-control">
                        <input type="text" className="form-control__input-text" name="newPoint" autoComplete="off"
                               placeholder={ this.placeholder }
                               ref={ (input) => { this.searchInput = input; } } />
                    </div>
                </form>
            </div>
        );
    }
}

PointSearch.propTypes = {
    addPoint: PropTypes.func.isRequired,
    onAddPoint: PropTypes.func.isRequired
};

export default PointSearch;
