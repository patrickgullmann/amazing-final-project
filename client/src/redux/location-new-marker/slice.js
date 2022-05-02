export default function locationNewMarkerReducer(coordinates = {}, action) {
    if (action.type === "location-new-marker/showed") {
        coordinates = action.payload.location;
    }
    return coordinates;
}

export function addLocationForNewMarker(location) {
    //also used for closing the popup!
    return {
        type: "location-new-marker/showed",
        payload: { location },
    };
}
