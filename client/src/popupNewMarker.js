import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { showPopupForNewMarker } from "./redux/popup-new-marker/slice.js";
import { addMarker } from "./redux/markers/slice.js";

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

    // --------- NEED TO HANDLE IF NOBODY UPLOADS AN IMAGE ...... ---------------
    const sumbmitPotentialIncidentData = () => {
        const fd = new FormData();
        fd.append("title", title);
        fd.append("description", description);
        fd.append("location", JSON.stringify(location));
        fd.append("file", image || "/images/defaultPicture.png");

        //and here test if string or not and
        //two routes in server for one with (default pic) and one without
        fetch("/api/new-marker", {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                dispatch(addMarker(data));
                setTitle("");
                setDescription("");
                setImage(null);
                dispatch(showPopupForNewMarker(false));
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
