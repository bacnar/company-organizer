import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import StationsModal from "components/TablesModals/StationsModal.js";
import Table from "components/Table/Table.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import AddBox from "@material-ui/icons/AddBox";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "assets/jss/material-dashboard-react/views/userStyle.js";
import PropTypes from "prop-types";
import {
  fetchStations,
  addStation,
  deleteStation,
  updateStation,
} from "actions/Station";
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

const Stations = (props) => {
  const classes = useStyles();

  const {
    fetchStations,
    stations,
    addStation,
    deleteStation,
    updateStation,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editStation, setEditStation] = React.useState(null);

  const closeModal = () => {
    setOpen(false);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
  };

  const editItem = (item) => {
    setEditStation(item);
    setOpenEdit(true);
  };

  React.useEffect(() => {
    fetchStations();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <GridContainer justify="space-between">
                <GridItem>
                  <h4 className={classes.cardTitleWhite}>Stations</h4>
                  <p className={classes.cardCategoryWhite}>
                    Stations of your company
                  </p>
                </GridItem>
                <GridItem>
                  <Button
                    type="button"
                    justIcon
                    color="info"
                    onClick={() => setOpen(true)}
                  >
                    <AddBox />
                  </Button>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  { displayName: "#", field: "id" },
                  { displayName: "Name", field: "name" },
                ]}
                tableData={stations}
                actions={true}
                editItemCallBack={editItem}
                deleteItemAction={deleteStation}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Modal
        open={open}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        onClose={closeModal}
        aria-labelledby="Add new station"
      >
        <Fade in={open}>
          <StationsModal
            headerText="Add new station"
            buttonText="Add station"
            formSubmitAction={addStation}
            closeModal={closeModal}
          />
        </Fade>
      </Modal>
      <Modal
        open={openEdit}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        onClose={closeEditModal}
        aria-labelledby="Add new station"
      >
        <Fade in={open}>
          <StationsModal
            headerText="Edit station"
            buttonText="Save"
            Station={editStation != null ? editStation : null}
            formSubmitAction={updateStation}
            closeModal={closeEditModal}
          />
        </Fade>
      </Modal>
    </div>
  );
};

Stations.propTypes = {
  fetchStations: PropTypes.func,
  addStation: PropTypes.func,
  deleteStation: PropTypes.func,
  updateStation: PropTypes.func,
  stations: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = ({ station }) => {
  return {
    stations: station.stations,
  };
};

const mapDispatchToProps = {
  fetchStations,
  addStation,
  deleteStation,
  updateStation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stations);
