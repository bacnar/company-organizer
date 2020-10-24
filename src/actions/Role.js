export const fetchRoles = () => {
  return { type: "FETCH_ROLES" };
};

export const fetchRolesSuccess = (roles) => {
  return {
    type: "FETCH_ROLES_SUCCESS",
    payload: roles,
  };
};

export const fetchRolesFail = () => {
  return { type: "FETCH_ROLES_FAIL" };
};

export const addRole = (name) => {
  return {
    type: "ADD_ROLE",
    payload: {
      name,
    },
  };
};

export const addRoleSuccess = () => {
  return { type: "ADD_ROLE_SUCCESS" };
};

export const addRoleFail = () => {
  return { type: "ADD_ROLE_FAIL" };
};

export const deleteRole = (id) => {
  return { type: "DELETE_ROLE", payload: id };
};

export const deleteRoleSuccess = () => {
  return { type: "DELETE_ROLE_SUCCESS" };
};

export const deleteRoleFail = () => {
  return { type: "DELETE_ROLE_FAIL" };
};

export const updateRole = (id, name) => {
  return {
    type: "UPDATE_ROLE",
    payload: {
      id,
      name,
    },
  };
};

export const updateRoleSuccess = () => {
  return { type: "UPDATE_ROLE_SUCCESS" };
};

export const updateRoleFail = () => {
  return { type: "UPDATE_ROLE_FAIL" };
};
