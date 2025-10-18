import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "./userReducer";
import articlesReducer from "./articlesReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  articelsState: articlesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
