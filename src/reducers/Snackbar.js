const initState = {
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarColor: "",
  snackbarIcon: undefined,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "SNACKBAR_SUCCESS":
      return {
        ...state,
        snackbarColor: "success",
        snackbarMessage: action.message,
        snackbarOpen: true,
        snackbarIcon: undefined,
      };
    case "SNACKBAR_DANGER":
      return {
        ...state,
        snackbarColor: "warning",
        snackbarMessage: action.message,
        snackbarOpen: true,
        snackbarIcon: undefined,
      };
    case "SNACKBAR_ERROR":
      return {
        ...state,
        snackbarColor: "danger",
        snackbarMessage: action.message,
        snackbarOpen: true,
        snackbarIcon: undefined,
      };
    case "SNACKBAR_INFO":
      return {
        ...state,
        snackbarColor: "info",
        snackbarMessage: action.message,
        snackbarOpen: true,
        snackbarIcon: undefined,
      };
    case "SNACKBAR_CLEAR":
      return {
        ...state,
        snackbarOpen: false,
        snackbarMessage: "",
        snackbarColor: "",
        snackbarIcon: undefined,
      };
    default:
      return state;
  }
};
