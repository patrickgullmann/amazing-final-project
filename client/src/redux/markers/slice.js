export default function markersReducer(markers = [], action) {
    if (action.type === "markers/received") {
        markers = action.payload.markers;
    } else if (action.type === "marker/added") {
        markers = [...markers, action.payload.marker];
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
