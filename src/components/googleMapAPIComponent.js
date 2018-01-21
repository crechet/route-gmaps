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

            // Load Google Maps api.
            this.loadGoogleMapsApi();

            this.state = {
                mapApiLoaded: false,
                mapApi: null
            };
        }

        loadGoogleMapsApi() {
            GoogleMapsLoader.KEY = GOOGLE_API_KEY;
            GoogleMapsLoader.LIBRARIES = ['places'];
            GoogleMapsLoader.load();
            GoogleMapsLoader.onLoad(this.onApiLoad);
        }

        onApiLoad(google) {
            // Update state with loaded api.
            this.setState({
                mapApiLoaded: true,
                mapApi: google
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
