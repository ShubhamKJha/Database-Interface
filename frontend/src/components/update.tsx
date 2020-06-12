import React from "react";
import UpdateIcon from "@material-ui/icons/Update";
import "bootstrap/dist/css/bootstrap.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import Typography from "@material-ui/core/Typography";
import { dispatch } from "../pages/store";
import {
  updateDatabase,
  updateTable,
  updateColumn,
  updateRow
} from "../pages/main/database/actions";

interface SectionProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function SectionPanel(props: SectionProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="sectionpanel"
      hidden={value !== index}
      id={`section-tabpanel-${index}`}
      aria-labelledby={`section-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
}

class Update extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      Delete: 1,
      value: 1,
      Database: "",
      NewDatabase: "",
      Table: "",
      NewTable: "",
      Column: "",
      NewColumn: "",
      Row: "",
      NewRow: ""
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.a11yProps = this.a11yProps.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event: React.ChangeEvent<{}>, newValue: number) {
    this.setState({
      // [event.target.name]: event.target.value,
      value: newValue
    });
  }

  handleInputChange(event: any) {
    // console.log(newValue);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  a11yProps(index: any) {
    return {
      id: `section-tab-${index}`,
      "aria-controls": `section-tabpanel-${index}`
    };
  }

  // function to handle operations required for submission
  handleSubmit(e: any) {
    e.preventDefault();
    this.setState({ open: false });
    switch (this.state.Delete) {
      case 0: {
        dispatch(
          updateDatabase({
            database: this.state.Database,
            newDatabase: this.state.NewDatabase
          })
        );
        break;
      }
      case 1: {
        dispatch(
          updateTable({
            database: this.state.Database,
            table: this.state.Table,
            newTable: this.state.NewTable
          })
        );
        break;
      }
      case 2: {
        dispatch(
          updateColumn({
            database: this.state.Database,
            table: this.state.Table,
            column: this.state.Column,
            newColumn: this.state.NewColumn
          })
        );
        break;
      }
      default: {
        dispatch(updateRow());
      }
    }
  }

  render() {
    return (
      <div>
        <Tooltip title="Update" aria-label="update">
          <IconButton
            size="small"
            aria-label="update"
            onClick={this.handleOpen}
          >
            <UpdateIcon style={{ color: "white" }} />
          </IconButton>
        </Tooltip>

        <Dialog
          onClose={this.handleClose}
          maxWidth="md"
          aria-labelledby="create-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="dialog-create-schema">Update Data</DialogTitle>
          <DialogContent>
            <div className="form-group">
              <Tabs
                value={this.state.value}
                onChange={this.handleSelectChange}
                aria-label="section-tab"
              >
                <Tab label="Database" {...this.a11yProps(0)} />
                <Tab label="Table" {...this.a11yProps(1)} />
                <Tab label="Column" {...this.a11yProps(2)} />
                <Tab label="Row" {...this.a11yProps(3)} />
              </Tabs>
            </div>
            <div>
              <SectionPanel value={this.state.value} index={0}>
                <div>
                  <div className="form-group">
                    <label>Database Name:</label>
                    <input
                      name="Database"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.Database}
                    />
                  </div>
                  <div className="form-group">
                    <label>New Database Name:</label>
                    <input
                      name="NewDatabase"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.NewDatabase}
                    />
                  </div>
                </div>
              </SectionPanel>
              <SectionPanel value={this.state.value} index={1}>
                <div>
                  <div className="form-group">
                    <label>Database Name:</label>
                    <input
                      name="Database"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.Database}
                    />
                  </div>
                  <div className="form-group">
                    <label>Table Name:</label>
                    <input
                      name="Table"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.Table}
                    />
                  </div>
                  <div className="form-group">
                    <label>New Table Name:</label>
                    <input
                      name="NewTable"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.NewTable}
                    />
                  </div>
                </div>
              </SectionPanel>
              <SectionPanel value={this.state.value} index={2}>
                <div>
                  <div className="form-group">
                    <label>Database Name:</label>
                    <input
                      name="Database"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.Database}
                    />
                  </div>
                  <div className="form-group">
                    <label>Table Name:</label>
                    <input
                      name="Table"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.Table}
                    />
                  </div>
                  <div className="form-group">
                    <label>Column Name:</label>
                    <input
                      name="Column"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.Column}
                    />
                  </div>
                  <div className="form-group">
                    <label>New Column Name:</label>
                    <input
                      name="NewColumn"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.NewColumn}
                    />
                  </div>
                </div>
              </SectionPanel>
              <SectionPanel value={this.state.value} index={3}>
                <div>
                  <div className="form-group">
                    <label>Database Name:</label>
                    <input
                      name="Database"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.Database}
                    />
                  </div>
                  <div className="form-group">
                    <label>Table Name:</label>
                    <input
                      name="Table"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.Table}
                    />
                  </div>
                  <div className="form-group">
                    <label>Row Name:</label>
                    <input
                      name="Row"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.Row}
                    />
                  </div>
                  <div className="form-group">
                    <label>New Row Name:</label>
                    <input
                      name="NewRow"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.NewRow}
                    />
                  </div>
                </div>
              </SectionPanel>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              className="btn btn-primary mr-2"
              type="submit"
              onClick={this.handleSubmit}
            >
              Update
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Update;
