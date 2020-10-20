// Lib imports
import { combineReducers } from "redux";

// Project imports
import Snackbar from "./Snackbar";

const reducers = combineReducers({
  snackbar: Snackbar,
});

export default reducers;
