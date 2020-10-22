import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import { fetchRolesSuccess, fetchRolesFail } from "actions/Role";
import { showErrorSnackbar } from "actions/Snackbar";

import { fetchRoles as fetchRolesRequest } from "Api";

function* fetchRoles() {
  try {
    const { data } = yield call(fetchRolesRequest);
    yield put(fetchRolesSuccess(data));
  } catch (e) {
    yield put(fetchRolesFail());
    yield put(showErrorSnackbar("Cannot get roles"));
  }
}

export function* watchFetchRoles() {
  yield takeLatest("FETCH_ROLES", fetchRoles);
}

export default function* rootSaga() {
  yield all([fork(watchFetchRoles)]);
}
