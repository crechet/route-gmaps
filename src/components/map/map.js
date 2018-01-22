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
        this.handleDeletePoint = this.handleDeletePoint.bind(this);
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
        this.handleDisplayRoute = this.handleDisplayRoute.bind(this);
        this.addPointMarker = this.addPointMarker.bind(this);
        this.reinitMap = this.reinitMap.bind(this);

        this.directionsService = null;
        this.directionsDisplay = null;

        this.state = {
            lat: Map.defaultProps.lat,
            lng: Map.defaultProps.lng,
            zoom: Map.defaultProps.zoom,
            map: null,
            points: [],
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
            this.setState({ map: new mapApi.maps.Map(this.refs.map, mapConfig), lat, lng, zoom, mapApi });
        }
    }

    reinitMap() {
        let { points, mapApi, zoom } = this.state;
        let mapConfig = { center: points[points.length - 1].geometry.location, zoom };
        this.setState({ map: new mapApi.maps.Map(this.refs.map, mapConfig) });
    }

    calculateAndDisplayRoute() {
        this.reinitMap();
        let { mapApi } = this.props;
        let { map, points } = this.state;
        let origin = points[0].geometry.location;
        let destination = points[points.length - 1].geometry.location;

        const generateWaypoints = () => {
            // Don't pass waypoints if only one point in route.
            if (points.length <= 1) return [];

            let tmpPoints = _.clone(points);
            tmpPoints.pop();
            tmpPoints.shift();
            tmpPoints = _.map(tmpPoints, (point, i) => {
                return {
                    location: point.geometry.location,
                    // If false, indicates that the route should be biased to go through this waypoint.
                    stopover: true
                }
            });

            return tmpPoints;
        };

        let waypoints = generateWaypoints();

        // if (points.length < 2) return;

        // Add directionsService for calculating routes.
        this.directionsService = new mapApi.maps.DirectionsService();

        // Add directionsDisplay for displaying calculated route.
        let directionsRendererConfig = {
            // Bind directionsDisplay to our map.
            map: map,
            preserveViewport: true,
            draggable: true
        };
        this.directionsDisplay = new mapApi.maps.DirectionsRenderer(directionsRendererConfig);

        // Route request config object.
        let routeRequestConfig = {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: 'DRIVING',
            unitSystem: mapApi.maps.UnitSystem.METRIC
        };

        // Calculate route.
        this.directionsService.route(routeRequestConfig, this.handleDisplayRoute);
    }

    handleDisplayRoute(response, status) {
        if (status === 'OK') {
            console.log('calculated route response', response);

            // Display calculated route.
            this.directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
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

    // Adds new point to the points list.
    handleAddPoint(place) {
        if (!place) return false;
        console.log('place', place);

        // Add place to points list.
        this.setState({
            points: this.state.points.concat(place)
        });

        //this.addPointMarker(place);
        this.calculateAndDisplayRoute();
    }

    handleDeletePoint(point) {
        console.log('delete point', point);
    }

    renderPoints() {
        let { mapApi } = this.props;
        let { map, points } = this.state;

        if (map) {
            return(
                <Points mapApi={ mapApi } map={ map }
                        points={ points }
                        onAddPoint={ this.handleAddPoint }
                        onDeletePoint={ this.handleDeletePoint } />
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
