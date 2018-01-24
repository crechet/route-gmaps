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
        this.handleDropPoint = this.handleDropPoint.bind(this);
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
        this.onDirectionsChanged = this.onDirectionsChanged.bind(this);
        this.handleDisplayRoute = this.handleDisplayRoute.bind(this);
        this.addPointMarker = this.addPointMarker.bind(this);
        this.setMapCenterToLastPoint = this.setMapCenterToLastPoint.bind(this);

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

    componentDidMount() {
        this.initMap();
    }

    initMap() {
        if (this.props && this.props.mapApi) {
            const { mapApi } = this.props;
            // Getting map props from parent component.
            let { lat, lng, zoom } = this.state;

            // Map config object.
            let mapConfig = { center: { lat, lng }, zoom };

            // Add directionsService for calculating routes.
            this.directionsService = new mapApi.maps.DirectionsService();
            // Add directionsDisplay for displaying calculated route.
            let directionsRendererConfig = {
                preserveViewport: true,
                draggable: true
            };
            this.directionsDisplay = new mapApi.maps.DirectionsRenderer(directionsRendererConfig);
            this.directionsDisplay.addListener('directions_changed', this.onDirectionsChanged);

            // Initiate map.
            this.setState({ map: new mapApi.maps.Map(this.refs.map, mapConfig), lat, lng, zoom, mapApi });
        }
    }

    setMapCenterToLastPoint() {
        let { points, map } = this.state;
        let lastPoint = _.last(points);
        if (lastPoint) {
            map.setCenter(lastPoint.geometry.location);
        }
    }

    calculateAndDisplayRoute() {
        this.setMapCenterToLastPoint();
        let { mapApi } = this.props;
        let { map, points } = this.state;

        if (points.length === 0) {
            // Clear directionsDisplay display. Remove route from map.
            this.directionsDisplay.setMap(null);
        } else {
            let origin = points[0] && points[0].geometry.location;
            let destination = points[points.length - 1] && points[points.length - 1].geometry.location;

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

            // Bind directionsDisplay to our map.
            this.directionsDisplay.setMap(map);

            // Route request config object.
            let routeRequestConfig = {
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                // Set false to connect route in strict order.
                optimizeWaypoints: false,
                travelMode: 'DRIVING',
                unitSystem: mapApi.maps.UnitSystem.METRIC
            };

            // Calculate route.
            this.directionsService.route(routeRequestConfig, this.handleDisplayRoute);
        }
    }

    // Display calculated route.
    handleDisplayRoute(response, status) {
        if (status === 'OK') {
            console.log('calculated route response', response);
            // Display calculated route.
            this.directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    }

    // Handle route change.
    onDirectionsChanged() {
        let currentDirections = this.directionsDisplay.getDirections();
        console.log('directions_changed currentDirections', currentDirections);
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

        // Don't add point that already in point list.
        let checkPointInList = _.find(this.state.points, point => point.id === place.id);
        if (checkPointInList) {
            alert('Место уже в списке');
            return;
        }

        console.log('place', place);

        // Add place to points list.
        this.setState({
            points: this.state.points.concat(place)
        }, this.calculateAndDisplayRoute);

        //this.addPointMarker(place);
    }

    // Delete point from points list.
    handleDeletePoint(pointToDeleteId) {
        this.setState({
            points: _.filter(this.state.points, (point) => {
                return point.id !== pointToDeleteId;
            })
        }, this.calculateAndDisplayRoute);
    }

    // Here we must handle changing points order.
    handleDropPoint(sourcePointId, targetPointId) {
        let { points } = this.state;

        let source = _.find(points, point => point.id === sourcePointId );
        let currentSourceIndex = _.findIndex(points, point => point.id === sourcePointId );
        let target = _.find(points, point => point.id === targetPointId );
        let currentTargetIndex = _.findIndex(points, point => point.id === targetPointId );

        let tempPoints = _.clone(points);
        tempPoints[currentSourceIndex] = target;
        tempPoints[currentTargetIndex] = source;

        this.setState({
            points: tempPoints
        }, this.calculateAndDisplayRoute);
    }

    renderPoints() {
        let { mapApi } = this.props;
        let { map, points } = this.state;

        if (map) {
            return(
                <Points mapApi={ mapApi }
                        map={ map }
                        points={ points }
                        onAddPoint={ this.handleAddPoint }
                        onDeletePoint={ this.handleDeletePoint }
                        onDropPoint={ this.handleDropPoint } />
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
