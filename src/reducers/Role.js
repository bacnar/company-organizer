const initState = {
  roles: [],
  rolesLoading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "FETCH_ROLES":
      return {
        ...state,
        rolesLoading: true,
      };
    case "FETCH_ROLES_SUCCESS":
      return {
        ...state,
        roles: action.payload,
        rolesLoading: false,
      };
    case "FETCH_ROLES_FAIL":
      return {
        ...state,
        rolesLoading: false,
      };
    case "ADD_ROLE":
    case "ADD_ROLE_SUCCESS":
    case "ADD_ROLE_FAIL":
    case "DELETE_ROLE":
    case "DELETE_ROLE_SUCCESS":
    case "DELETE_ROLE_FAIL":
    case "UPDATE_ROLE":
    case "UPDATE_ROLE_SUCCESS":
    case "UPDATE_ROLE_FAIL":
      return {
        ...state,
      };
    default:
      return state;
  }
};
