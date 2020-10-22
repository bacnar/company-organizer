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
    default:
      return state;
  }
};
