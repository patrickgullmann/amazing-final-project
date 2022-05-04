import { BrowserRouter, Route } from "react-router-dom";
import Map from "./map";
import PopupNewMarker from "./popupNewMarker";
import PopupMarkerInfo from "./popupMarkerInfo";
import TypeAnimation from "react-type-animation";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Route exact path="/">
                    {/* <h1 className="welcome">! Welcome to Biketastic 🚲 </h1>
                    <h3 className="welcome-subtitle">Your friendly helper for safe bike travels inside your city by marking potential incident places</h3> */}

                    <TypeAnimation
                        className="welcome"
                        cursor={false}
                        sequence={[
                            "! Welcome to Biketastic 🚲 ",
                            1000,
                            "! Welcome to Biketastic 🚲 ",
                        ]}
                        wrapper="h1"
                        repeat={1}
                    />
                    <TypeAnimation
                        className="welcome-subtitle"
                        cursor={false}
                        sequence={[
                            "Your friendly helper for safe bike travels inside your city by marking potential incident places",
                            1000,
                            "Your friendly helper for safe bike travels inside your city by marking potential incident places",
                        ]}
                        wrapper="h3"
                        repeat={1}
                    />
                    <Map />
                    <PopupNewMarker />
                    <PopupMarkerInfo />
                </Route>
            </BrowserRouter>
        </>
    );
}
