import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import rootReducer from "./reducers";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composedEnhancer);
const persistor = persistStore(store);
export { store, persistor };