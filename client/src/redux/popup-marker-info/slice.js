export default function popupMarkerInfoReducer(popup = false, action) {
    if (action.type === "popup-marker-info/showed") {
        popup = action.payload;
    }
    return popup;
}

export function showPopupForMarkerInfo(boolean, markerId) {
    //also used for closing the popup!
    return {
        type: "popup-marker-info/showed",
        payload: { boolean, markerId },
    };
}
