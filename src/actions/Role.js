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
