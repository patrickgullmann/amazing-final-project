import { useState, useEffect, useRef } from "react";

import MapGL, { Marker, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { useDispatch, useSelector } from "react-redux";
import { receiveMarkers } from "./redux/markers/slice.js";
import { showPopupForNewMarker } from "./redux/popup-new-marker/slice.js";
import { addLocationForNewMarker } from "./redux/location-new-marker/slice.js";
import { showPopupForMarkerInfo } from "./redux/popup-marker-info/slice.js";

export default function Map() {
    const [location, setLocation] = useState({
        longitude: 13.383309,
        latitude: 52.516806,
        zoom: 9,
    });

    const dispatch = useDispatch();
    const markers = useSelector((state) => state.markers && state.markers);

    const mapRef = useRef();
    const geocoderContainerRef = useRef();

    const handleLocationChange = (newLocation) => {
        //console.log(newLocation);
        return setLocation(newLocation);
    };

    const clickHandlerShowPopupForNewMarker = (e) => {
        dispatch(showPopupForNewMarker(true));
        dispatch(
            addLocationForNewMarker({
                longitude: e.lngLat[0],
                latitude: e.lngLat[1],
            })
        );
        //all done in popupNewMarker.js!
    };

    const clickHandlerShowPopupWithInfo = (markerId) => {
        dispatch(showPopupForMarkerInfo(true, markerId));
        //all done in popupMarkerInfo.js!
    };

    useEffect(async () => {
        (async () => {
            const res = await fetch("/api/setup-markers");
            const data = await res.json();
            //console.log(data);
            dispatch(receiveMarkers(data));
        })();
    }, []);

    return (
        <div className="map-container">
            <div
                className="geocoder-container"
                ref={geocoderContainerRef}
            ></div>
            <MapGL
                ref={mapRef}
                {...location}
                width="100%"
                height="100%"
                onViewportChange={handleLocationChange}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                // eslint-disable-next-line no-undef
                mapboxApiAccessToken={MAPBOX_API_KEY}
                onClick={clickHandlerShowPopupForNewMarker}
            >
                <GeolocateControl
                    style={{
                        top: 30,
                        right: 20,
                        position: "absolute",
                    }}
                />
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        longitude={parseFloat(marker.longitude)}
                        latitude={parseFloat(marker.latitude)}
                        anchor="bottom"
                        onClick={() => clickHandlerShowPopupWithInfo(marker.id)}
                    >
                        {marker.counter < 3 && (
                            <svg
                                className="markerSvg"
                                xmlns="http://www.w3.org/2000/svg"
                                height="40px"
                                viewBox="0 0 24 24"
                                width="40px"
                                fill="#ff8d14"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        )}
                        {marker.counter >= 3 && marker.counter < 10 && (
                            <svg
                                className="markerSvg"
                                xmlns="http://www.w3.org/2000/svg"
                                height="40px"
                                viewBox="0 0 24 24"
                                width="40px"
                                fill="#ee4500"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        )}
                        {marker.counter >= 10 && (
                            <svg
                                className="markerSvg"
                                xmlns="http://www.w3.org/2000/svg"
                                height="40px"
                                viewBox="0 0 24 24"
                                width="40px"
                                fill="#a30400"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        )}
                    </Marker>
                ))}
                <Geocoder
                    mapRef={mapRef}
                    containerRef={geocoderContainerRef}
                    onViewportChange={handleLocationChange}
                    // eslint-disable-next-line no-undef
                    mapboxApiAccessToken={MAPBOX_API_KEY}
                    position="top-left"
                    marker={false}
                />
            </MapGL>
        </div>
    );
}

// if you are happy with Geocoder default settings, you can just use handleViewportChange directly
// const handleGeocoderViewportChange = useCallback((newViewport) => {
//     const geocoderDefaultOverrides = { transitionDuration: 3000 };

//     return handleViewportChange({
//         ...newViewport,
//         ...geocoderDefaultOverrides,
//     });
// }, []);
