import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import {
  fetchRoles as fetchRolesAction,
  fetchRolesSuccess,
  fetchRolesFail,
  addRoleSuccess,
  addRoleFail,
  deleteRoleSuccess,
  deleteRoleFail,
  updateRoleSuccess,
  updateRoleFail,
} from "actions/Role";
import { showErrorSnackbar, showSuccessSnackbar } from "actions/Snackbar";

import {
  fetchRoles as fetchRolesRequest,
  addRole as addRoleRequest,
  deleteRole as deleteRoleRequest,
  updateRole as updateRoleRequest,
} from "Api";

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

function* addRole({ payload }) {
  try {
    yield call(addRoleRequest, payload.name);
    yield put(addRoleSuccess());
    yield put(showSuccessSnackbar(`Role ${payload.name} successfully added.`));
    yield put(fetchRolesAction());
  } catch (e) {
    yield put(addRoleFail());
    yield put(showErrorSnackbar("Cannot add role."));
  }
}

export function* watchAddRole() {
  yield takeLatest("ADD_ROLE", addRole);
}

function* deleteRole({ payload }) {
  try {
    yield call(deleteRoleRequest, payload);
    yield put(deleteRoleSuccess());
    yield put(showSuccessSnackbar(`Role successfully deleted.`));
    yield put(fetchRolesAction());
  } catch (e) {
    yield put(deleteRoleFail());
    yield put(
      showErrorSnackbar(
        "Cannot delete role, maybe some users are using it. Please asign them other role."
      )
    );
  }
}

export function* watchDeleteRole() {
  yield takeLatest("DELETE_ROLE", deleteRole);
}

function* updateRole({ payload }) {
  try {
    yield call(updateRoleRequest, payload.id, payload.name);
    yield put(updateRoleSuccess());
    yield put(
      showSuccessSnackbar(`Role ${payload.name} successfully updated.`)
    );
    yield put(fetchRolesAction());
  } catch (e) {
    yield put(updateRoleFail());
    yield put(showErrorSnackbar("Cannot update role."));
  }
}

export function* watchUpdateRole() {
  yield takeLatest("UPDATE_ROLE", updateRole);
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchRoles),
    fork(watchAddRole),
    fork(watchDeleteRole),
    fork(watchUpdateRole),
  ]);
}
