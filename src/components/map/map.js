import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './map.css';

/**
 * Wrapper component for external map library. Manage all relationship between react and map library.
 * */

export default class Map extends Component {
    // Render one time and never render again.
    // TODO check this...
    /*shouldComponentUpdate() {
        return false;
    }*/

    // Component receive new props, but not update current props. Update map props here.
    componentWillReceiveProps(nextProps) {
        // Call internal map library methods.
        // this.map.panTo();
        // console.log('componentWillReceiveProps', this.props);
    }

    componentDidMount() {
        // console.log('componentDidMount', this.props);
    }

    // Component have new props values.
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.mapApi !== this.props.mapApi) {
            this.initMap();
        }
    }

    initMap() {
        this.map = new this.props.mapApi.maps.Map(this.refs.map, {
            center: { lat: this.props.lat, lng: this.props.lng },
            zoom: this.props.zoom
        });
    }

    render() {
        return(
            <div id="test" className="map" ref="map"></div>
        );
    }
}

Map.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
};
