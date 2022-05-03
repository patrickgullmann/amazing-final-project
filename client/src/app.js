import { BrowserRouter, Route } from "react-router-dom";
import Map from "./map";
import PopupNewMarker from "./popupNewMarker";
import PopupMarkerInfo from "./popupMarkerInfo";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Route exact path="/">
                    <h1 className="welcome">! Welcome to Biketastic 🚲 </h1>
                    <h3 className="welcome-subtitle">
                        Your friendly helper for safe bike travels inside your
                        city
                    </h3>
                    <Map />
                    <PopupNewMarker />
                    <PopupMarkerInfo />
                </Route>
            </BrowserRouter>
        </>
    );
}
