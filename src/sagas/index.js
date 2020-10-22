import { all } from "redux-saga/effects";
import roleSagas from "./Role";
import stationSagas from "./Station";
import userSagas from "./User";

export default function* rootSaga() {
  yield all([roleSagas(), stationSagas(), userSagas()]);
}
