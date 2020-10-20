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
import styles from "assets/jss/material-dashboard-react/views/userStyle.js";
import PropTypes from "prop-types";

import { showErrorSnackbar, showSuccessSnackbar } from "actions/Snackbar";
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

const Users = (props) => {
  const classes = useStyles();

  const { showErrorSnackbar, showSuccessSnackbar } = props;

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const [editUser, setEditUser] = React.useState(null);

  const [users, setUsers] = React.useState([]);
  const [stations, setStations] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

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
    setEditUser({
      id: item[0].key,
      name: item[1].key,
      stationId: item[2].key,
      roleId: item[3].key,
      username: item[4].key,
      email: item[5].key,
      password: item[6].key,
    });

    setOpenEdit(true);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);

      showSuccessSnackbar("User deleted");

      getUsers();
    } catch (error) {
      console.error("Cannot delete user, response error:", error.response.data);

      showErrorSnackbar("Cannot delete user");
    }
  };

  const addUser = async (
    id,
    name,
    station,
    role,
    username,
    email,
    password
  ) => {
    try {
      await axios.post(`http://localhost:8080/users/`, {
        name: name,
        stationId: station,
        roleId: role,
        username: username,
        email: email,
        password: password,
      });

      showSuccessSnackbar(`User ${name} added`);

      setOpen(false);

      getUsers();
    } catch (error) {
      console.error("Cannot add user, response error:", error.response.data);

      showErrorSnackbar("Cannot add user");
    }
  };

  const updateUser = async (
    id,
    name,
    station,
    role,
    username,
    email,
    password
  ) => {
    try {
      await axios.put(`http://localhost:8080/users/`, {
        id: id,
        name: name,
        stationId: station,
        roleId: role,
        username: username,
        email: email,
        password: password,
      });

      showSuccessSnackbar(`User ${name} edited`);

      setOpenEdit(false);

      getUsers();
    } catch (error) {
      console.error("Cannot edit user, response error:", error.response.data);

      showErrorSnackbar("Cannot edit user");
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/`);
      setUsers(response.data);
    } catch (error) {
      console.error("Cannot get users", error.response.data);
      showErrorSnackbar("Cannot get users");
    }
  };

  const getStations = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/stations/`);
      setStations(response.data);
    } catch (error) {
      console.error(
        "Cannot get stations, response error:",
        error.response.data
      );
      showErrorSnackbar("Cannot get stations");
    }
  };

  const getRoles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/roles/`);
      setRoles(response.data);
    } catch (error) {
      console.error("Cannot get roles, response error:", error.response.data);
      showErrorSnackbar("Cannot get roles");
    }
  };

  React.useEffect(() => {
    getUsers();
    getStations();
    getRoles();
  }, [editUser]);

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
                tableHead={[
                  "#",
                  "Name",
                  "Station",
                  "Role",
                  "Username",
                  "Email",
                  "Password",
                ]}
                tableData={users.map((user) => [
                  { key: user.id, value: user.id },
                  { key: user.name, value: user.name },
                  { key: user.station_id, value: user.station_name },
                  { key: user.role_id, value: user.role_name },
                  { key: user.username, value: user.username },
                  { key: user.email, value: user.email },
                  { key: user.password, value: user.password },
                ])}
                actions={true}
                editItemCallBack={editItem}
                deleteItemCallBack={deleteUser}
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
            user={editUser != null ? editUser : null}
            formSubmitCallBack={updateUser}
          />
        </Fade>
      </Modal>
    </div>
  );
};

Users.propTypes = {
  showErrorSnackbar: PropTypes.func,
  showSuccessSnackbar: PropTypes.func,
};

const mapDispatchToProps = {
  showErrorSnackbar,
  showSuccessSnackbar,
};

export default connect(null, mapDispatchToProps)(Users);
