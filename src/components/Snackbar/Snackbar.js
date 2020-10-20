import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snack from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import styles from "assets/jss/material-dashboard-react/components/snackbarContentStyle.js";
import { connect } from "react-redux";
import { clearSnackbar } from "actions/Snackbar";

const useStyles = makeStyles(styles);

const Snackbar = (props) => {
  const classes = useStyles();

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarColor,
    clearSnackbar,
    iconSnackbar,
  } = props;

  const messageClasses = classNames({
    [classes.iconMessage]: iconSnackbar !== undefined,
  });

  function handleClose() {
    clearSnackbar();
  }

  const action = [
    <IconButton
      className={classes.iconButton}
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={() => handleClose()}
    >
      <Close className={classes.close} />
    </IconButton>,
  ];

  return (
    <Snack
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={snackbarOpen}
      message={
        <div>
          {iconSnackbar !== undefined ? (
            <props.icon className={classes.iconSnackbar} />
          ) : null}
          <span className={messageClasses}>{snackbarMessage}</span>
        </div>
      }
      action={action}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        classes: {
          root: classes.root + " " + classes[snackbarColor],
          message: classes.message,
        },
      }}
    />
  );
};

Snackbar.propTypes = {
  iconSnackbar: PropTypes.object,
  clearSnackbar: PropTypes.func,
  snackbarOpen: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  snackbarColor: PropTypes.string.isRequired,
};

const mapStateToProps = ({ snackbar }) => snackbar;

const mapDispatchToProps = {
  clearSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
