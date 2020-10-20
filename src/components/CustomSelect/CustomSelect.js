import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import MenuItem from "@material-ui/core/MenuItem";

const capitalize = {
  textTransform: "capitalize",
};

const useStyles = makeStyles(styles);

export default function CustomSelect(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    selectData,
    errorMessage,
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });

  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
      error={error ? true : false}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        classes={{
          root: marginTop,
          disabled: classes.disabled,
        }}
        style={capitalize}
        id={id}
        {...inputProps}
      >
        {selectData.map((prop, key) => {
          return (
            <MenuItem key={key} value={prop[0]} style={capitalize}>
              {prop[1]}
            </MenuItem>
          );
        })}
      </Select>
      {error ? (
        <FormHelperText id="component-error-text">
          {errorMessage}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

CustomSelect.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  errorMessage: PropTypes.string,
  selectData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
};
