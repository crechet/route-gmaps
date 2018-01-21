import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './map.css';

import Points from '../points/points'

/**
 * Wrapper component for external map library.
 * */
export default class Map extends Component {
    constructor(props) {
        super(props);

        this.handleAddPoint = this.handleAddPoint.bind(this);
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
        this.addPointMarker = this.addPointMarker.bind(this);

        this.state = {
            lat: Map.defaultProps.lat,
            lng: Map.defaultProps.lng,
            zoom: Map.defaultProps.zoom,
            map: null,
            // points: {}
            points: []
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

            // Initiate map.
            this.setState({ map: new mapApi.maps.Map(this.refs.map, mapConfig), lat, lng, zoom });
        }
    }

    calculateAndDisplayRoute() {
        // TODO rearange waypoints.
        let { mapApi } = this.props;
        let { map, points } = this.state;

        const generateWaypoints = () => {
            return _.map(points, (point) => {
                return {
                    location: point.geometry.location,
                    stopover: true
                }
            });
        };
        let waypoints = generateWaypoints();

        // Add directionsService for calculating routes.
        const directionsService = new mapApi.maps.DirectionsService();

        // Add directionsDisplay for displaying calculated route.
        let directionsRendererConfig = {
            // Bind directionsDisplay to our map.
            map: map,
            preserveViewport: true,
            // draggable: true
        };
        const directionsDisplay = new mapApi.maps.DirectionsRenderer(directionsRendererConfig);

        let routeRequestConfig = {
            origin: waypoints[0].location,
            destination: waypoints[waypoints.length - 1].location,
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING',
            unitSystem: mapApi.maps.UnitSystem.METRIC
        };

        directionsService.route(routeRequestConfig, function(response, status) {
            if (status === 'OK') {
                console.log('calculated route response', response);
                // Display calculated route.
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    // Adds new point to the points list.
    handleAddPoint(place) {
        if (!place) return false;
        console.log('place', place);
        let { map } = this.state;

        // Center map to selected position.
        if (place.geometry && place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
            map.setCenter(place.geometry.location);
        } else {
            map.setZoom(15);
            map.setCenter(place.geometry.location);
        }

        // Add place to points list.
        this.setState({
            // TODO: objects or array...
            // points: { ...this.state.points, [place.id]: place }
            points: this.state.points.concat(place)
        });

        //this.addPointMarker(place);
        this.calculateAndDisplayRoute();
    }

    // TODO not in use now...
    addPointMarker(place) {
        /*if (!place) return false;
        let { mapApi } = this.props;
        let { map } = this.state;

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        let marker = new mapApi.maps.Marker({
            position: place.geometry.location,
            map
        });*/
    }

    renderPoints() {
        let { mapApi } = this.props;
        let { map, points } = this.state;

        if (map) {
            return(
                <Points mapApi={ mapApi } map={ map } onAddPoint={ this.handleAddPoint } points={ points } />
            );
        }
    }

    render() {
        return(
            <div className="map">
                <div className="map" ref="map"></div>
                { this.renderPoints() }
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
    zoom: 12
};
