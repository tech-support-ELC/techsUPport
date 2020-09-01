import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import conditions from "./redux/conditions";
import condition from "./redux/singleCondition";
import currentUser from "./redux/auth";
import users from "./redux/users";
import medications from "./redux/medications";
import medication from "./redux/singleMedication";
import documents from "./redux/documents";
import singleDocument from "./redux/singleDocument";
import doctors from "./redux/doctors";
import doctor from './redux/singleDoctor';
import score from './redux/dcCondition';
import appointment from './redux/dcDoctor';
import med from './redux/dcMedication';
import chart from './redux/score';
import todayScore from './redux/dcTodayScore';
import todayAppointment from './redux/dcTodayAppointment';
import todayMed from './redux/dcTodayMed';
const reducer = combineReducers({
  users,
  currentUser,
  conditions,
  condition,
  medications,
  medication,
  documents,
  singleDocument,
  doctors,
  doctor,
  score,
  appointment,
  med,
  chart,
  todayScore,
  todayAppointment,
  todayMed
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
