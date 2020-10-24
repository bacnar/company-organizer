import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import EditTableActions from "components/EditTableActions/EditTableActions.js";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const capitalize = {
  textTransform: "capitalize",
};

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    actions,
    editItemCallBack,
    deleteItemAction,
  } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table size="small" className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                    align="left"
                  >
                    {prop.displayName}
                  </TableCell>
                );
              })}
              {actions ? (
                <TableCell
                  className={classes.tableCell + " " + classes.tableHeadCell}
                  key="actions"
                  align="right"
                >
                  Actions
                </TableCell>
              ) : null}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((dataProp, dataKey) => {
            return (
              <TableRow key={dataKey} className={classes.tableBodyRow}>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell}
                      key={key}
                      style={capitalize}
                    >
                      {dataProp[prop.field]}
                    </TableCell>
                  );
                })}
                {actions ? (
                  <EditTableActions
                    editItemCallBack={editItemCallBack}
                    deleteItemAction={deleteItemAction}
                    editItem={dataProp}
                    deleteItemId={dataProp["id"]}
                  />
                ) : null}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  actions: false,
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(
    PropTypes.objectOf({ displayName: PropTypes.any, field: PropTypes.any })
  ),
  tableData: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.bool,
  editItemCallBack: PropTypes.func,
  deleteItemAction: PropTypes.func,
};
