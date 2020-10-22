// Lib imports
import { combineReducers } from "redux";

// Project imports
import Snackbar from "./Snackbar";
import Role from "./Role";
import Station from "./Station";
import User from "./User";

const reducers = combineReducers({
  snackbar: Snackbar,
  user: User,
  station: Station,
  role: Role,
});

export default reducers;
