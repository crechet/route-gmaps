import React, { Component } from 'react';
import GoogleMapsLoader from 'google-maps';

import { GOOGLE_API_KEY } from '../constants';

/**
 * Add Google Map API script on page.
 * */
const googleMapAPIComponent = (ComposedComponent) => {
    class GoogleMapAPIComponent extends Component {
        constructor(props) {
            super(props);

            this.onApiLoad = this.onApiLoad.bind(this);

            // Load Google Map api.
            GoogleMapsLoader.KEY = GOOGLE_API_KEY;
            GoogleMapsLoader.load();
            GoogleMapsLoader.onLoad(this.onApiLoad);

            this.state = {
                mapApiLoaded: false,
                mapApi: null
            };
        }

        onApiLoad(google) {
            // Update state with loaded api.
            this.mapApi = google;

            this.setState({
                mapApiLoaded: true,
                mapApi: this.mapApi
            });
        }

        render() {
            const props = Object.assign({}, this.props, {
                mapApiLoaded: this.state.mapApiLoaded,
                mapApi: this.state.mapApi
            });

            return(
                <ComposedComponent { ...props }></ComposedComponent>
            );
        }
    }

    return GoogleMapAPIComponent;
};

export default googleMapAPIComponent;
