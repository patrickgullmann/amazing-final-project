import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Map from "./map";
import PopupNewMarker from "./popupNewMarker";

import { useState, useEffect, useRef } from "react";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Route exact path="/">
                    <h1>Welcome to Biketastic 🚒</h1>
                    <Map />
                    <PopupNewMarker />
                </Route>
            </BrowserRouter>
        </>
    );
}
