import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Map from "./map";

import { useState, useEffect, useRef } from "react";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <header>
                    <nav>
                        <Link to="/">Home Not Logged In</Link>
                    </nav>
                </header>
                <Route exact path="/">
                    <h1>Your are not logged in 🚒</h1>
                    <Map />
                </Route>
            </BrowserRouter>
        </>
    );
}
