import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import React, { useState, useEffect, useRef, useCallback } from "react";

import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function MyMap(props) {
    const [location, setLocation] = useState({
        longitude: 13.383309,
        latitude: 52.516806,
        zoom: 9,
    });

    console.log(location);

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
                                {...location}
                                onMove={(e) => setLocation(e.viewState)}
                                width="100%"
                                height="100%"
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                                // eslint-disable-next-line no-undef
                                mapboxAccessToken={MAPBOX_API_KEY}
                            />
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
