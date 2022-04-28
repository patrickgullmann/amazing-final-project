import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import React, { useState, useEffect, useRef, useCallback } from "react";

import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function MyMap(props) {
    const [viewport, setViewport] = useState({
        latitude: 52.516806,
        longitude: 13.383309,
        zoom: 9,
    });
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback((newViewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides,
        });
    }, []);

    if (!props.loggedInUser) {
        return (
            <>
                <BrowserRouter>
                    <header>
                        <nav>
                            <Link to="/">Home Not Logged In</Link>
                        </nav>
                    </header>
                    <Route exact path="/">
                        <h1>Your are not logged in 🚒</h1>
                        <div className="map-container">
                            <MapGL
                                ref={mapRef}
                                {...viewport}
                                width="100%"
                                height="100%"
                                onViewportChange={handleViewportChange}
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                                // eslint-disable-next-line no-undef
                                mapboxApiAccessToken={MAPBOX_API_KEY}
                            >
                                <Geocoder
                                    mapRef={mapRef}
                                    onViewportChange={
                                        handleGeocoderViewportChange
                                    }
                                    // eslint-disable-next-line no-undef
                                    mapboxApiAccessToken={MAPBOX_API_KEY}
                                    position="top-left"
                                />
                            </MapGL>
                        </div>
                    </Route>
                </BrowserRouter>
            </>
        );
    }
    return (
        <>
            <BrowserRouter>
                <header>
                    <nav>
                        <Link to="/">Home Logged In</Link>
                    </nav>
                </header>

                <>
                    <Route exact path="/">
                        <h1>You are logged in 🚛</h1>
                    </Route>
                </>
            </BrowserRouter>
        </>
    );
}
