import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import { showErrorSnackbar, showSuccessSnackbar } from "actions/Snackbar";
import {
  fetchStations as fetchStationsAction,
  fetchStationsSuccess,
  fetchStationsFail,
  addStationSuccess,
  addStationFail,
  deleteStationSuccess,
  deleteStationFail,
  updateStationSuccess,
  updateStationFail,
} from "actions/Station";

import {
  fetchStations as fetchStationsRequest,
  addStation as addStationRequest,
  deleteStation as deleteStationRequest,
  updateStation as updateStationRequest,
} from "Api";

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

function* addStation({ payload }) {
  try {
    yield call(addStationRequest, payload.name);
    yield put(addStationSuccess());
    yield put(
      showSuccessSnackbar(`Station ${payload.name} successfully added.`)
    );
    yield put(fetchStationsAction());
  } catch (e) {
    yield put(addStationFail());
    yield put(showErrorSnackbar("Cannot add station."));
  }
}

export function* watchAddStation() {
  yield takeLatest("ADD_STATION", addStation);
}

function* deleteStation({ payload }) {
  try {
    yield call(deleteStationRequest, payload);
    yield put(deleteStationSuccess());
    yield put(showSuccessSnackbar(`Station successfully deleted.`));
    yield put(fetchStationsAction());
  } catch (e) {
    yield put(deleteStationFail());
    yield put(
      showErrorSnackbar(
        "Cannot delete station, maybe some users are using it. Please asign them other station."
      )
    );
  }
}

export function* watchDeleteStation() {
  yield takeLatest("DELETE_STATION", deleteStation);
}

function* updateStation({ payload }) {
  try {
    yield call(updateStationRequest, payload.id, payload.name);
    yield put(updateStationSuccess());
    yield put(
      showSuccessSnackbar(`Station ${payload.name} successfully updated.`)
    );
    yield put(fetchStationsAction());
  } catch (e) {
    yield put(updateStationFail());
    yield put(showErrorSnackbar("Cannot update station."));
  }
}

export function* watchUpdateStation() {
  yield takeLatest("UPDATE_STATION", updateStation);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchStations),
    fork(watchAddStation),
    fork(watchDeleteStation),
    fork(watchUpdateStation),
  ]);
}
