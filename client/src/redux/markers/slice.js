export default function markersReducer(markers = [], action) {
    if (action.type === "markers/received") {
        markers = action.payload.markers;
    } else if (action.type === "marker/added") {
        markers = [...markers, action.payload.marker];
    } else if (action.type === "marker/updated") {
        markers = markers.map((marker) => {
            if (marker.id == action.payload.marker.id) {
                marker = {
                    ...marker,
                    counter: action.payload.marker.counter,
                };
            }
            return marker;
        });
    }
    return markers;
}

export function receiveMarkers(markers) {
    return {
        type: "markers/received",
        payload: { markers },
    };
}

export function addMarker(marker) {
    return {
        type: "marker/added",
        payload: { marker },
    };
}

export function updateMarkerBcOfCounter(marker) {
    return {
        type: "marker/updated",
        payload: { marker },
    };
}
