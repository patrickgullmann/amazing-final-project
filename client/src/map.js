import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Map(props) {
    if (!props.loggedInUser) {
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
                    </Route>
                </BrowserRouter>
            </>
        );
    }
    return (
        <>
            <BrowserRouter>
                <header>
                    <nav>
                        <Link to="/">Home Logged In</Link>
                    </nav>
                </header>

                <>
                    <Route exact path="/">
                        <h1>You are logged in 🚛</h1>
                    </Route>
                </>
            </BrowserRouter>
        </>
    );
}
