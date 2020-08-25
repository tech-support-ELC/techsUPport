import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import conditions from "./redux/conditions";
import currentUser from "./redux/auth";
import users from "./redux/users";
import medications from "./redux/medications";
import medication from "./redux/singleMedication";
import condition from './redux/singleCondition';
import score from './redux/dailyCheckin'
const reducer = combineReducers({
  users,
  currentUser,
  conditions,
  condition,
  medications,
  medication,
  score
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
