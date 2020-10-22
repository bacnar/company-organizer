import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
// core components
import taskStyles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import tableStyles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { connect } from "react-redux";

const useStyles = makeStyles(taskStyles);
const useTableStyles = makeStyles(tableStyles);

const EditTableActions = (props) => {
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const { editItemCallBack, deleteItemAction, editItem, deleteItemId } = props;

  return (
    <TableCell align="right" className={tableClasses.tableCell}>
      <Tooltip
        id="tooltip-top"
        title="Edit"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="Edit"
          onClick={() => editItemCallBack(editItem)}
        >
          <Edit className={classes.edit} />
        </IconButton>
      </Tooltip>
      <Tooltip
        id="tooltip-top-start"
        title="Remove"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="Delete"
          onClick={() => deleteItemAction(deleteItemId)}
        >
          <Delete className={classes.close} />
        </IconButton>
      </Tooltip>
    </TableCell>
  );
}

EditTableActions.propTypes = {
  editItem: PropTypes.any,
  deleteItemId: PropTypes.number,
  editItemCallBack: PropTypes.func,
  deleteItemAction: PropTypes.func,
};

export default connect()(EditTableActions);
