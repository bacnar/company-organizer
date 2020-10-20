import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomSelect/CustomSelect";
import styles from "assets/jss/material-dashboard-react/components/tablesModalStyle.js";
import { showErrorSnackbar } from "actions/Snackbar";
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

const UsersModal = (props) => {
  const classes = useStyles();
  const {
    headerText,
    buttonText,
    stationData,
    roleData,
    formSubmitCallBack,
    user,
    showErrorSnackbar,
  } = props;

  const [name, setName] = React.useState(user === undefined ? "" : user.name);
  const [role, setRole] = React.useState(user === undefined ? "" : user.roleId);
  const [station, setStation] = React.useState(
    user === undefined ? "" : user.stationId
  );
  const [username, setUsername] = React.useState(
    user === undefined ? "" : user.username
  );
  const [email, setEmail] = React.useState(
    user === undefined ? "" : user.email
  );
  const [password, setPassword] = React.useState(
    user === undefined ? "" : user.password
  );
  const [confirmPassword, setConfirmPassword] = React.useState(
    user === undefined ? "" : user.password
  );

  const [nameError, setNameError] = React.useState(false);
  const [stationError, setStationError] = React.useState(false);
  const [roleError, setRoleError] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let setError = false;

    if (name.trim() === "") {
      setNameError(true);
      setError = true;
    }

    if (station === "") {
      setStationError(true);
      setError = true;
    }

    if (role === "") {
      setRoleError(true);
      setError = true;
    }

    if (username.trim() === "") {
      setUsernameError(true);
      setError = true;
    }

    if (email.trim() === "") {
      setEmailError(true);
      setError = true;
    }

    if (password.trim() === "") {
      setPasswordError(true);
      setError = true;
    }

    if (
      confirmPassword.trim() === "" ||
      password.trim() !== confirmPassword.trim()
    ) {
      setConfirmPasswordError(true);
      setError = true;
    }

    if (setError) {
      showErrorSnackbar("Did you filled all fields properly?");
    } else {
      formSubmitCallBack(
        user.id,
        name,
        station,
        role,
        username,
        email,
        password
      );
    }
  };

  const handleChange = (event, id) => {
    const target = event.target;

    if (id === "name") {
      setName(target.value);
      setNameError(false);
    }

    if (id === "station") {
      setStation(target.value);
      setStationError(false);
    }

    if (id === "role") {
      setRole(target.value);
      setRoleError(false);
    }

    if (id === "username") {
      setUsername(target.value);
      setUsernameError(false);
    }

    if (id === "email") {
      setEmail(target.value);
      setEmailError(false);
    }

    if (id === "password") {
      setPassword(target.value);
      setPasswordError(false);
    }

    if (id === "confirmPassword") {
      setConfirmPassword(target.value);
      setConfirmPasswordError(false);
    }
  };

  return (
    <GridItem xs={10} sm={6} md={3}>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{headerText}</h4>
          </CardHeader>
          <CardBody>
            <GridContainer direction="column">
              <GridItem>
                <CustomInput
                  labelText="Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleChange(event, "name"),
                    value: name,
                  }}
                  error={nameError}
                  errorMessage="Please enter user name"
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  labelText="Username"
                  id="username"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleChange(event, "username"),
                    value: username,
                  }}
                  error={usernameError}
                  errorMessage="Please enter user username"
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleChange(event, "email"),
                    value: email,
                  }}
                  error={emailError}
                  errorMessage="Please enter user email"
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleChange(event, "password"),
                    value: password,
                    type: "password",
                  }}
                  error={passwordError}
                  errorMessage="Please enter user password"
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  labelText="Confirm password"
                  id="confirmPassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => handleChange(event, "confirmPassword"),
                    value: confirmPassword,
                    type: "password",
                  }}
                  error={confirmPasswordError}
                  errorMessage="Please enter correct password"
                />
              </GridItem>
              <GridItem>
                <CustomSelect
                  labelText="Station"
                  id="station"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  selectData={stationData}
                  inputProps={{
                    onChange: (event) => handleChange(event, "station"),
                    value: station,
                  }}
                  error={stationError}
                  errorMessage="Please select station"
                />
              </GridItem>
              <GridItem>
                <CustomSelect
                  labelText="Role"
                  id="role"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  selectData={roleData}
                  inputProps={{
                    onChange: (event) => handleChange(event, "role"),
                    value: role,
                  }}
                  error={roleError}
                  errorMessage="Please select role"
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="primary">
              {buttonText}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </GridItem>
  );
};

UsersModal.propTypes = {
  headerText: PropTypes.string,
  buttonText: PropTypes.string,
  user: PropTypes.object,
  stationData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  roleData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  formSubmitCallBack: PropTypes.func,
  showErrorSnackbar: PropTypes.func,
};

const mapDispatchToProps = {
  showErrorSnackbar,
};

export default connect(null, mapDispatchToProps)(UsersModal);
