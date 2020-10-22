export const fetchUsers = () => {
  return { type: "FETCH_USERS" };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: "FETCH_USERS_SUCCESS",
    payload: users,
  };
};

export const fetchUsersFail = () => {
  return { type: "FETCH_USERS_FAIL" };
};

export const addUser = (name, stationId, roleId, username, email, password) => {
  return {
    type: "ADD_USER",
    payload: {
      name,
      stationId,
      roleId,
      username,
      email,
      password,
    },
  };
};

export const addUserSuccess = () => {
  return { type: "ADD_USER_SUCCESS" };
};

export const addUserFail = () => {
  return { type: "ADD_USER_FAIL" };
};

export const deleteUser = (id) => {
  return { type: "DELETE_USER", payload: id };
};

export const deleteUserSuccess = () => {
  return { type: "DELETE_USER_SUCCESS" };
};

export const deleteUserFail = () => {
  return { type: "DELETE_USER_FAIL" };
};

export const updateUser = (
  id,
  name,
  stationId,
  roleId,
  username,
  email,
  password
) => {
  return {
    type: "UPDATE_USER",
    payload: {
      id,
      name,
      stationId,
      roleId,
      username,
      email,
      password,
    },
  };
};

export const updateUserSuccess = () => {
  return { type: "UPDATE_USER_SUCCESS" };
};

export const updateUserFail = () => {
  return { type: "UPDATE_USER_FAIL" };
};
