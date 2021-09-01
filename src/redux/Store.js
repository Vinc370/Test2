import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducers";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

export default createStore(rootReducer, composedEnhancer);