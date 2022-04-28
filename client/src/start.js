import ReactDOM from "react-dom";
import Map from "./map";

import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducer.js";

import { Provider } from "react-redux";

import { init } from "./socket.js";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

fetch("/api/user/id")
    .then((response) => response.json())
    .then((data) => {
        init(store);

        if (!data.userId) {
            ReactDOM.render(
                <Map loggedInUser={false} />,
                document.querySelector("main")
            );
        } else {
            ReactDOM.render(
                <Provider store={store}>
                    <Map loggedInUser={true} />
                </Provider>,
                document.querySelector("main")
            );
        }
    });
