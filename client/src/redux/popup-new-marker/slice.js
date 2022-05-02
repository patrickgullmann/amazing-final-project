export default function popupNewMarkerReducer(popup = false, action) {
    if (action.type === "popup-new-marker/showed") {
        popup = action.payload.boolean;
    }
    return popup;
}

export function showPopupForNewMarker(boolean) {
    //also used for closing the popup!
    return {
        type: "popup-new-marker/showed",
        payload: { boolean },
    };
}

// export function closePopupForNewMarker(boolean) {
//     return {
//         type: "popup-new-marker/closed",
//         payload: { boolean },
//     };
// }
