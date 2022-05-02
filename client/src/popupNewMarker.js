import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { showPopupForNewMarker } from "./redux/popup-new-marker/slice.js";

export default function PopupNewMarker() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();
    const popupNewMarker = useSelector(
        (state) => state.popupNewMarker && state.popupNewMarker
    );
    const location = useSelector(
        (state) => state.locationNewMarker && state.locationNewMarker
    );

    console.log(title, description, image, location);

    const sumbmitPotentialIncidentData = () => {
        const fd = new FormData();
        fd.append("title", title);
        fd.append("description", description);
        fd.append("location", location);
        fd.append("file", image);

        fetch("/api/new-marker-final", {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((response) => {
                //csl
            })
            .catch((err) => {
                console.log("err sending to server: ", err);
            });
    };

    const clickHandlerClosePopupForNewMarker = () => {
        setTitle("");
        setDescription("");
        setImage(null);
        dispatch(showPopupForNewMarker(false));
    };

    if (!popupNewMarker) {
        return <></>;
    }
    return (
        <div className="modal-uploader">
            <div className="modal-content-uploader">
                <span
                    className="close-uploader"
                    onClick={clickHandlerClosePopupForNewMarker}
                >
                    &times;
                </span>
                <h1> Please give us some info of the INCIDENT </h1>
                <input
                    value={title}
                    placeholder="Drop a title ..."
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    type="text"
                ></input>
                <h3>How about a description? </h3>
                <textarea
                    value={description}
                    placeholder="Drop a description of the potential incident place ... "
                    onChange={(e) => setDescription(e.target.value)}
                />
                <h3>You can also upload a picture :) </h3>
                <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    name="file"
                    accept="image/*"
                ></input>
                <h3> And finally submit </h3>
                <button onClick={sumbmitPotentialIncidentData}>Submit!</button>
            </div>
        </div>
    );
}
