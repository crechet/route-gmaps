import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './map.css';

import Points from '../points/points'

/**
 * Wrapper component for external map library.
 * */
export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: Map.defaultProps.lat,
            lng: Map.defaultProps.lng,
            zoom: Map.defaultProps.zoom,
            map: null
        };
    }
    // Render one time and never render again.
    // TODO check this...
    /*shouldComponentUpdate() {
        return false;
    }*/

    // Component have new props values.
    /*componentDidUpdate(prevProps, prevState) {
        if (prevProps.mapApi !== this.props.mapApi) {
            this.initMap();
        }
    }*/

    // Component receive new props, but not update current props. Update map props here.
    componentWillReceiveProps(nextProps) {
        // Call internal map library methods.
        // this.map.panTo();
        // console.log('componentWillReceiveProps', this.props);
    }

    componentDidMount() {
        this.initMap();
    }

    initMap() {
        if (this.props && this.props.mapApi) {
            const { mapApi } = this.props;
            // Getting map props from parent component.
            let { lat, lng, zoom } = this.state;

            // Map config object.
            let mapConfig = {
                center: { lat, lng },
                zoom
            };

            this.setState({
                map: new mapApi.maps.Map(this.refs.map, mapConfig),
                lat,
                lng,
                zoom
            });
        }
    }

    render() {
        let { mapApi } = this.props;
        let { map } = this.state;

        return(
            <div className="map">
                <div className="map" ref="map"></div>
                { map ? <Points mapApi={ mapApi } map={ map } /> : "" }
            </div>
        );
    }
}

Map.propTypes = {
    mapApi: PropTypes.object.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
};

Map.defaultProps = {
    lat: 59.9403958,
    lng: 30.31379620000007,
    zoom: 8
};
