import { useState, useEffect, useRef } from "react";

import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { useDispatch, useSelector } from "react-redux";
import { receiveMarkers } from "./redux/markers/slice.js";

export default function Map() {
    const [location, setLocation] = useState({
        longitude: 13.383309,
        latitude: 52.516806,
        zoom: 9,
    });

    //const [markers, setMarkers] = useState([]);
    const dispatch = useDispatch();
    const markers = useSelector((state) => state.markers && state.markers);

    const mapRef = useRef();
    const geocoderContainerRef = useRef();

    const handleLocationChange = (newLocation) => {
        //console.log(newLocation);
        return setLocation(newLocation);
    };

    const clickHandlerNewMarker = (e) => {
        (async () => {
            const res = await fetch("/api/new-marker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Hello",
                    longitude: e.lngLat[0],
                    latitude: e.lngLat[1],
                }),
            });
            const data = await res.json();
            console.log(data);
            //setMarkers([...markers, data]);
        })();
    };

    const clickHandlerShowPopup = (markerId) => {
        (async () => {
            const res = await fetch(`/api/get-marker-info/${markerId}`);
            const data = await res.json();
            console.log(data);
        })();
    };

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/setup-markers");
            const data = await res.json();
            //console.log(data);
            //setMarkers(data);
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
                onClick={clickHandlerNewMarker}
            >
                {markers &&
                    markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            longitude={parseFloat(marker.longitude)}
                            latitude={parseFloat(marker.latitude)}
                            anchor="bottom"
                            onClick={() => clickHandlerShowPopup(marker.id)}
                        >
                            <img
                                className="markerImg"
                                height="40px"
                                src="/images/pin.png"
                            />
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
