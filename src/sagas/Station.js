import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import { fetchStationsSuccess, fetchStationsFail } from "actions/Station";
import { showErrorSnackbar } from "actions/Snackbar";
import { fetchStations as fetchStationsRequest } from "Api";

function* fetchStations() {
  try {
    const { data } = yield call(fetchStationsRequest);
    yield put(fetchStationsSuccess(data));
  } catch (e) {
    yield put(fetchStationsFail());
    yield put(showErrorSnackbar("Cannot get stations"));
  }
}

export function* watchFetchStations() {
  yield takeLatest("FETCH_STATIONS", fetchStations);
}

export default function* rootSaga() {
  yield all([fork(watchFetchStations)]);
}
