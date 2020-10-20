export const showSuccessSnackbar = (message) => ({
  type: "SNACKBAR_SUCCESS",
  message,
});

export const showErrorSnackbar = (message) => ({
  type: "SNACKBAR_ERROR",
  message,
});

export const showWarningSnackbar = (message) => ({
  type: "SNACKBAR_DANGER",
  message,
});

export const showInfoSnackbar = (message) => ({
  type: "SNACKBAR_INFO",
  message,
});

export const clearSnackbar = () => ({
  type: "SNACKBAR_CLEAR",
});
