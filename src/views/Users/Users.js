import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import UsersModal from "components/TablesModals/UsersModal.js";
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
import axios from "axios";
import Snackbar from "components/Snackbar/Snackbar.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const useStyles = makeStyles(styles);

export default function Users() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editUser, setEditUser] = React.useState(null);
  const [deleteUserId, setDeleteUSerId] = React.useState(null);

  const [users, setUsers] = React.useState([]);
  const [stations, setStations] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

  const [notification, setNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [notificationColor, setNotificationColor] = React.useState("info");

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
  };

  const editItem = (item) => {
    setEditUser(item);
    setOpenEdit(true);
  };

  const deleteItem = (id) => {
    setDeleteUSerId(id);
  };

  const addUser = async (name, station, role) => {
    try {
      await axios.post(`http://localhost:8080/users/`, {
        name: name,
        stationId: station,
        roleId: role,
      });

      setNotificationMessage("User added");
      setNotificationColor("success");
      setOpen(false);

      setNotification(true);
    } catch (error) {
      console.error("Cannot add user", error);
      setNotificationMessage("Cannot add user");
      setNotificationColor("danger");

      setNotification(true);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/`);
      setUsers(response.data);
    } catch (error) {
      console.error("Cannot get users", error);
    }
  };

  const getStations = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/stations/`);
      setStations(response.data);
    } catch (error) {
      console.error("Cannot get stations", error);
    }
  };

  const getRoles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/roles/`);
      setRoles(response.data);
    } catch (error) {
      console.error("Cannot get stations", error);
    }
  };

  React.useEffect(() => {
    getUsers();
    getStations();
    getRoles();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <GridContainer justify="space-between">
                <GridItem>
                  <h4 className={classes.cardTitleWhite}>Users</h4>
                  <p className={classes.cardCategoryWhite}>
                    Users of your company
                  </p>
                </GridItem>
                <GridItem>
                  <Button
                    type="button"
                    justIcon
                    color="info"
                    onClick={openModal}
                  >
                    <AddBox />
                  </Button>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Station", "Role"]}
                tableData={users.map((value) => [
                  value.name,
                  value.station_name,
                  value.role_name,
                ])}
                actions={true}
                editItemCallBack={editItem}
                deleteItemCallBack={deleteItem}
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
        aria-labelledby="Add new user"
      >
        <Fade in={open}>
          <UsersModal
            headerText="Add new user"
            buttonText="Add user"
            stationData={stations.map((value) => [value.id, value.name])}
            roleData={roles.map((value) => [value.id, value.name])}
            formSubmitCallBack={addUser}
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
        aria-labelledby="Add new user"
      >
        <Fade in={open}>
          <UsersModal
            headerText="Edit user"
            buttonText="Save"
            stationData={stations.map((value) => [value.id, value.name])}
            roleData={roles.map((value) => [value.id, value.name])}
            nameValue={editUser != null ? editUser.name : null}
            stationValue={editUser != null ? editUser.station : null}
            roleValue={editUser != null ? editUser.role : null}
          />
        </Fade>
      </Modal>
      <Snackbar
        place="tr"
        color={notificationColor}
        message={notificationMessage}
        open={notification}
        closeNotification={() => setNotification(false)}
        close
      />
    </div>
  );
}
