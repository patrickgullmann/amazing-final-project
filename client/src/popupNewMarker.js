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
        <div className="modal-uploader-add">
            <div className="modal-content-uploader-add">
                <h1 className="modal-content-uploader-add-h1">
                    Add another potential incident place
                </h1>
                <h3>Where is the place located?</h3>
                <input
                    className="modal-content-uploader-add-input-title"
                    value={title}
                    placeholder="Leave a title ... "
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    type="text"
                ></input>
                <h3>
                    Can you describe the potential incident place in more
                    detail?
                </h3>
                <textarea
                    className="modal-content-uploader-add-textarea-description"
                    value={description}
                    placeholder="Drop a short description of the potential incident place ... "
                    onChange={(e) => setDescription(e.target.value)}
                />
                <h3> 🔽 You can also upload a picture 🔽 </h3>
                <input
                    className="modal-content-uploader-add-input-picture"
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    name="file"
                    accept="image/*"
                ></input>
                <button
                    className="button-28"
                    onClick={sumbmitPotentialIncidentData}
                >
                    Submit!
                </button>
                <button
                    className="modal-content-uploader-add-button-close"
                    onClick={clickHandlerClosePopupForNewMarker}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
