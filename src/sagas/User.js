import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import {
  fetchUsers as fetchUsersAction,
  fetchUsersSuccess,
  fetchUsersFail,
  addUserSuccess,
  addUserFail,
  deleteUserSuccess,
  deleteUserFail,
  updateUserSuccess,
  updateUserFail,
} from "actions/User";
import { showErrorSnackbar, showSuccessSnackbar } from "actions/Snackbar";

import {
  fetchUsers as fetchUsersRequest,
  addUser as addUserRequest,
  deleteUser as deleteUserRequest,
  updateUser as updateUserRequest,
} from "Api";

function* fetchUsers() {
  try {
    const { data } = yield call(fetchUsersRequest);
    yield put(fetchUsersSuccess(data));
  } catch (e) {
    yield put(fetchUsersFail());
    yield put(showErrorSnackbar("Cannot get users"));
  }
}

export function* watchFetchUsers() {
  yield takeLatest("FETCH_USERS", fetchUsers);
}

function* addUser({ payload }) {
  try {
    yield call(
      addUserRequest(
        payload.name,
        payload.stationId,
        payload.roleId,
        payload.username,
        payload.email,
        payload.password
      )
    );
    yield put(addUserSuccess());
    yield put(showSuccessSnackbar(`User ${payload.name} successfully added.`));
    yield put(fetchUsersAction());
  } catch (e) {
    yield put(addUserFail());
    yield put(showErrorSnackbar("Cannot add user."));
  }
}

export function* watchAddUser() {
  yield takeLatest("ADD_USER", addUser);
}

function* deleteUser({ payload }) {
  try {
    yield call(deleteUserRequest(payload));
    yield put(deleteUserSuccess());
    yield put(showSuccessSnackbar(`User successfully deleted.`));
    yield put(fetchUsersAction());
  } catch (e) {
    yield put(deleteUserFail());
    yield put(showErrorSnackbar("Cannot delete user"));
  }
}

export function* watchDeleteUser() {
  yield takeLatest("DELETE_USER", deleteUser);
}

function* updateUser({ payload }) {
  try {
    yield call(
      updateUserRequest(
        payload.id,
        payload.name,
        payload.stationId,
        payload.roleId,
        payload.username,
        payload.email,
        payload.password
      )
    );
    yield put(updateUserSuccess());
    yield put(
      showSuccessSnackbar(`User ${payload.name} successfully updated.`)
    );
    yield put(fetchUsersAction());
  } catch (e) {
    yield put(updateUserFail());
    yield put(showErrorSnackbar("Cannot update user."));
  }
}

export function* watchUpdateUser() {
  yield takeLatest("UPDATE_USER", updateUser);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchUsers),
    fork(watchAddUser),
    fork(watchDeleteUser),
    fork(watchUpdateUser),
  ]);
}
