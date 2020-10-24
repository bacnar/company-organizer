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
import styles from "assets/jss/material-dashboard-react/components/tablesModalStyle.js";
import { showErrorSnackbar } from "actions/Snackbar";
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

const StationsModal = (props) => {
  const classes = useStyles();
  const {
    headerText,
    buttonText,
    formSubmitAction,
    station,
    showErrorSnackbar,
    closeModal,
  } = props;

  const [name, setName] = React.useState(
    station === undefined ? "" : station.name
  );

  const [nameError, setNameError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.trim() === "") {
      setNameError(true);
      showErrorSnackbar("Did you filled name properly?");
    } else {
      if (station === undefined) {
        formSubmitAction(name);
        closeModal();
      } else {
        formSubmitAction(station.id, name);
        closeModal();
      }
    }
  };

  const handleChange = (event, id) => {
    const target = event.target;

    if (id === "name") {
      setName(target.value);
      setNameError(false);
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

StationsModal.propTypes = {
  headerText: PropTypes.string,
  buttonText: PropTypes.string,
  station: PropTypes.object,
  formSubmitAction: PropTypes.func,
  showErrorSnackbar: PropTypes.func,
  closeModal: PropTypes.func,
};

const mapDispatchToProps = {
  showErrorSnackbar,
};

export default connect(null, mapDispatchToProps)(StationsModal);
