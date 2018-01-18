import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './map.css';

/**
 * Wrapper component for external map library. Manage all relationship between react and map library.
 * */

export default class Map extends Component {
    // Render one time and never render again.
    shouldComponentUpdate() {
        return false;
    }

    // Update map props here.
    componentWillReceiveProps(nextProps) {
        // Call internal map library methods.
        // this.map.panTo();
    }

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        this.addMap();
    }

    addMap() {
        const scriptTag = window.document.getElementsByTagName('script')[0];
        const scriptMap = window.document.createElement('script');
        scriptMap.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDp39kg5fDCh-WnF2DmhBT4-yYVoVO3HVg&callback=initMap';
        scriptMap.async = true;
        scriptMap.defer = true;
        scriptTag.parentNode.insertBefore(scriptMap, scriptTag);
    }

    initMap() {
        this.map = new window.google.maps.Map(this.refs.map, {
            center: { lat: this.props.lat, lng: this.props.lng },
            zoom: 8
        });
    }

    render() {
        return(
            <div id="map" className="map" ref="map"></div>
        );
    }
}

Map.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
};
