const initState = {
  users: [],
  usersLoading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        usersLoading: true,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        usersLoading: false,
      };
    case "FETCH_USERS_FAIL":
      return {
        ...state,
        usersLoading: false,
      };
    case "ADD_USER":
    case "ADD_USER_SUCCESS":
    case "ADD_USER_FAIL":
    case "DELETE_USER":
    case "DELETE_USER_SUCCESS":
    case "DELETE_USER_FAIL":
    case "UPDATE_USER":
    case "UPDATE_USER_SUCCESS":
    case "UPDATE_USER_FAIL":
      return {
        ...state,
      };
    default:
      return state;
  }
};
