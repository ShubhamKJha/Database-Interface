import React, { Fragment } from "react";
import InputIcon from "@material-ui/icons/Input";
import "bootstrap/dist/css/bootstrap.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { dispatch, store } from "../pages/store";
import { insertData, updateTable } from "../pages/main/database/actions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { NativeSelect } from "@material-ui/core";
import styles from "./insert.module.css";

const SelectTable = props => {
  const [SelectedTable, setSelectedTable] = React.useState("testTable");

  const handleInput = e => {
    setSelectedTable(e.target.value);
    dispatch(updateTable(e.target.value));
  };

  return (
    <div className="form-group col-sm-5">
      <NativeSelect
        value={SelectedTable}
        className="form-control"
        name="database"
        onChange={handleInput}
      >
        {props.tables.map((obj, index) => (
          <option key={`${obj}~${index}`} value={obj}>
            {obj}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
};

export class InsertUnconnected extends React.Component {
  static porpTypes = {
    MySqlSchema: PropTypes.object.isRequired,
    TableName: PropTypes.string.isRequired,
    SchemaCreated: PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      values: [],
      Schema: [],
      tables: [],
      MySqlSchema: this.props.MySqlSchema,
      TableName: this.props.TableName,
      SchemaCreated: this.props.SchemaCreated
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddFields = this.handleAddFields.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveFields = this.handleRemoveFields.bind(this);
  }

  componentDidUpdate(prevProps, nextProps, snapshot) {
    const tableName = store.getState().databaseReducer.TableName;
    if (this.state.TableName !== tableName) {
      const lst = [];
      const tableLst = [];
      this.state.MySqlSchema.forEach(object => {
        tableLst.push(object.TableName);
        if (object.TableName === tableName) {
          object.Column.forEach(value => {
            lst.push({
              value: "",
              Field: value.Field,
              Type: value.Type
            });
          });
        }
      });
      this.setState({
        tables: tableLst,
        Schema: lst,
        values: [lst],
        SchemaCreated: true,
        TableName: tableName
      });
    }
  }

  handleInputChange(event, index) {
    const val = [...this.state.values[index]].map(object => {
      if (object.Field === event.target.name) {
        return Object.assign({}, object, {
          value: event.target.value
        });
      } else return object;
    });
    const values = [...this.state.values];
    values[index] = val;
    this.setState({
      values: values
    });
  }

  handleOpen() {
    console.log("to insert:", this.state);
    if (this.state.SchemaCreated === true) this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  // function to handle operations required for submission
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ open: false });
    const data = this.state.values;
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    dispatch(insertData(this.state.values));
    fetch("/db/connect", init)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => {
        console.error("Error:", error);
      });
  }

  handleAddFields() {
    const values = [...this.state.values];
    values.push(this.state.Schema.slice());
    this.setState({ values: values });
  }

  handleRemoveFields(index) {
    const values = [...this.state.values];
    console.log("Pressed");
    values.splice(index, 1);
    this.setState({ values: values });
  }

  render() {
    return (
      <div>
        <Tooltip title="Insert" aria-label="add">
          <IconButton size="small" onClick={this.handleOpen} aria-label="add">
            <InputIcon style={{ color: "white" }} />
          </IconButton>
        </Tooltip>

        <Dialog
          onClose={this.handleClose}
          maxWidth="md"
          aria-labelledby="create-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="dialog-create-schema">Insert Data</DialogTitle>
          <DialogContent>
            <SelectTable tables={this.state.tables} />
            <div className={styles.root}>
              {this.state.values.map((data, parentIndex) => (
                <Fragment key={`${data}~${parentIndex}`}>
                  <div className={styles.row}>
                    <div className={styles.row}>
                      {data.map((fm, index) => (
                        <div key={`${index}`} className="form-group col-sm-3">
                          <label htmlFor={fm.Field}>
                            {fm.Field}
                            <input
                              onChange={e =>
                                this.handleInputChange(e, parentIndex)
                              }
                              type="text"
                              className="form-control"
                              id={`${fm.Field}~${parentIndex}`}
                              name={fm.Field}
                              value={fm.value}
                            />
                          </label>
                        </div>
                      ))}
                      <div className="form-group col-sm-2">
                        <button
                          className="btn btn-link"
                          type="button"
                          onClick={() => this.handleRemoveFields(parentIndex)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-link"
                          type="button"
                          onClick={() => this.handleAddFields()}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <button
              className="btn btn-primary mr-2"
              type="submit"
              onClick={this.handleSubmit}
            >
              Create
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = {
  insertData
};

export const mapStateToProps = state => ({
  MySqlSchema: state.databaseReducer.MySqlSchema,
  TableName: state.databaseReducer.TableName,
  SchemaCreated: state.databaseReducer.SchemaCreated
});

export default connect(mapStateToProps, mapDispatchToProps)(InsertUnconnected);
