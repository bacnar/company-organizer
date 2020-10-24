import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import RolesModal from "components/TablesModals/RolesModal.js";
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
import { fetchRoles, addRole, deleteRole, updateRole } from "actions/Role";
import { connect } from "react-redux";

const useStyles = makeStyles(styles);

const Roles = (props) => {
  const classes = useStyles();

  const { fetchRoles, roles, addRole, deleteRole, updateRole } = props;

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editRole, setEditRole] = React.useState(null);

  const closeModal = () => {
    setOpen(false);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
  };

  const editItem = (item) => {
    setEditRole(item);
    setOpenEdit(true);
  };

  React.useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <GridContainer justify="space-between">
                <GridItem>
                  <h4 className={classes.cardTitleWhite}>Roles</h4>
                  <p className={classes.cardCategoryWhite}>
                    Roles for your company
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
                tableData={roles}
                actions={true}
                editItemCallBack={editItem}
                deleteItemAction={deleteRole}
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
        aria-labelledby="Add new Role"
      >
        <Fade in={open}>
          <RolesModal
            headerText="Add new role"
            buttonText="Add role"
            formSubmitAction={addRole}
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
        aria-labelledby="Add new user"
      >
        <Fade in={open}>
          <RolesModal
            headerText="Edit role"
            buttonText="Save"
            role={editRole != null ? editRole : null}
            formSubmitAction={updateRole}
            closeModal={closeEditModal}
          />
        </Fade>
      </Modal>
    </div>
  );
};

Roles.propTypes = {
  fetchRoles: PropTypes.func,
  addRole: PropTypes.func,
  deleteRole: PropTypes.func,
  updateRole: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = ({ role }) => {
  return {
    roles: role.roles,
  };
};

const mapDispatchToProps = {
  fetchRoles,
  addRole,
  deleteRole,
  updateRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
