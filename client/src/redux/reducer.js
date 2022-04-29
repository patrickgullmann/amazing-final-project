import { combineReducers } from "redux";
import markersReducer from "./markers/slice.js";

const rootReducer = combineReducers({
    markers: markersReducer,
});

export default rootReducer;
