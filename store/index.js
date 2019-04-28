import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import locations from "./locations";

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const reducer = combineReducers({ locations });
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
