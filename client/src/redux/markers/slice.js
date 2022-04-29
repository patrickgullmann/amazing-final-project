export default function markersReducer(markers = [], action) {
    if (action.type === "markers/received") {
        markers = action.payload.markers;
    }
    return markers;
}

export function receiveMarkers(markers) {
    return {
        type: "markers/received",
        payload: { markers },
    };
}

// export function makeFriend(otherUserId) {
//     return {
//         type: "friends-wannabees/accepted",
//         payload: { otherUserId },
//     };
// }
