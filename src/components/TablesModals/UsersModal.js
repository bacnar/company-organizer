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
import Snackbar from "components/Snackbar/Snackbar.js";

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function UsersModal(props) {
  const classes = useStyles();
  const {
    headerText,
    buttonText,
    nameValue,
    stationValue,
    roleValue,
    stationData,
    roleData,
    formSubmitCallBack,
  } = props;

  const [name, setName] = React.useState(
    nameValue === undefined ? "" : nameValue
  );
  const [role, setRole] = React.useState(
    roleValue === undefined ? "" : roleValue
  );
  const [station, setStation] = React.useState(
    stationValue === undefined ? "" : stationValue
  );

  const [nameError, setNameError] = React.useState(false);
  const [stationError, setStationError] = React.useState(false);
  const [roleError, setRoleError] = React.useState(false);

  const [notification, setNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [notificationColor, setNotificationColor] = React.useState("info");

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

    if (setError && !notification) {
      setNotification(true);
      setNotificationMessage("Please fill all fields");
      setNotificationColor("danger");
    } else {
      formSubmitCallBack(name, station, role);
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

    setNotification(false);
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
      <Snackbar
        place="tr"
        color={notificationColor}
        message={notificationMessage}
        open={notification}
        closeNotification={() => setNotification(false)}
        close
      />
    </GridItem>
  );
}

UsersModal.propTypes = {
  headerText: PropTypes.string,
  buttonText: PropTypes.string,
  nameValue: PropTypes.string,
  stationValue: PropTypes.string,
  roleValue: PropTypes.string,
  stationData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  roleData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  formSubmitCallBack: PropTypes.func,
};
