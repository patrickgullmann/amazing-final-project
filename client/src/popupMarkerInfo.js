import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { showPopupForMarkerInfo } from "./redux/popup-marker-info/slice.js";
import { updateMarkerBcOfCounter } from "./redux/markers/slice.js";
import Weather from "./weather";

export default function PopupNewMarker() {
    const dispatch = useDispatch();
    const popupMarkerInfo = useSelector(
        (state) => state.popupMarkerInfo && state.popupMarkerInfo
    );

    const [voted, setVoted] = useState(false);

    //note: is an Object inside an Array!
    const markerInfo = useSelector(
        (state) =>
            state.markers &&
            state.markers.filter(
                (marker) => marker.id == popupMarkerInfo.markerId
            )
    );

    useEffect(async () => {
        setVoted(false);
    }, [popupMarkerInfo]);

    const clickHandlerClosePopupForMarkerInfo = () => {
        dispatch(showPopupForMarkerInfo(false));
    };

    let dangerousness = "";
    if (markerInfo.length != 0) {
        if (markerInfo[0].counter >= 10) {
            dangerousness = "Heavy";
        } else if (markerInfo[0].counter >= 3) {
            dangerousness = "Medium";
        } else {
            dangerousness = "Slightly";
        }
    }

    const clickHandlerIncreaseCount = () => {
        (async () => {
            const res = await fetch(
                `/api/increase-count-for-marker/${popupMarkerInfo.markerId}`
            );
            const data = await res.json();
            dispatch(updateMarkerBcOfCounter(data));
            setVoted(true);
        })();
    };

    if (!popupMarkerInfo.boolean) {
        return <></>;
    }
    return (
        <div className="modal-uploader">
            <div className="modal-content-uploader">
                <figure className="figureIncident">
                    <img
                        className="imgIncident"
                        src={markerInfo[0].url || "/images/defaultPicture.png"}
                        height="200px"
                    />
                </figure>
                <div className="modal-content-container-text">
                    <div>
                        <h3>{markerInfo[0].title}</h3>
                        <p className="desc">
                            Description: {markerInfo[0].description}
                        </p>
                    </div>
                    <div>
                        <Weather
                            latitude={markerInfo[0].latitude}
                            longitude={markerInfo[0].longitude}
                        />
                        <p className="dang">
                            Dangerousness: {dangerousness} |{" "}
                            {markerInfo[0].counter} people marked this place
                        </p>
                        {!voted && (
                            <button
                                className="button-28"
                                id="button-increase"
                                onClick={clickHandlerIncreaseCount}
                            >
                                Increase Awareness
                            </button>
                        )}
                        {voted && <p>Thanks for voting!</p>}
                    </div>
                </div>
                <button
                    className="modal-content-uploader-add-button-close"
                    onClick={clickHandlerClosePopupForMarkerInfo}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
