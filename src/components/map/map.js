import React, { Component } from 'react';
import './map.css';

/**
 * Wrapper component for external map library. Manage all relationship between react and map library.
 * */

export default class Map extends Component {
    // Never rerender.
    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        window.initMap = this.initMap.bind(this);
        this.loadMap();
    }

    loadMap() {
        const scriptTag = window.document.getElementsByTagName('script')[0];
        const scriptMap = window.document.createElement('script');
        scriptMap.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDp39kg5fDCh-WnF2DmhBT4-yYVoVO3HVg&callback=initMap';
        scriptMap.async = true;
        scriptMap.defer = true;
        scriptTag.parentNode.insertBefore(scriptMap, scriptTag);
    }

    initMap() {
        console.log('try init map');
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }

    render() {
        return(
            <div id="map" className="map"></div>
        );
    }
}
