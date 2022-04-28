import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <>
                <BrowserRouter>
                    <header>
                        <nav>
                            <Link to="/">Home</Link>
                        </nav>
                    </header>

                    <>
                        <Route exact path="/">
                            <h1>Hello</h1>
                        </Route>
                    </>
                </BrowserRouter>
            </>
        );
    }
}
