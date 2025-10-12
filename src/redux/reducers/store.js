import { combineReducers, createStore, applyMiddleware } from "redux";
import userReducer from "./userReducer";
import { thunk } from "redux-thunk";
import articlesReducer from "./articlesReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  articelsState: articlesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
