import React, { useState, Fragment } from "react";
import AddIcon from "@material-ui/icons/Add";
import "bootstrap/dist/css/bootstrap.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import NativeSelect from "@material-ui/core/NativeSelect";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { updateTable, createSchema } from "../pages/main/database/actions";
import { dispatch } from "../pages/store";
import { connect } from "react-redux";

export const TableName = props => {
  const [TableName, setTableName] = useState("");

  const handleInput = e => {
    props.setTableName(e.target.value);
    setTableName(e.target.value);
  };

  return (
    <div className="form-group col-sm-3">
      <input
        onChange={handleInput}
        type="text"
        className="form-control"
        id="TableName"
        name="TableName"
        value={TableName}
      />
    </div>
  );
};

export class CreateUnconnected extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveFields = this.handleRemoveFields.bind(this);
    this.handleAddFields = this.handleAddFields.bind(this);
    this.setTableName = this.setTableName.bind(this);
    this.state = {
      open: false,
      inputFields: [{ Field: "", Type: "char", fieldConstraints: "not_null" }],
      tableName: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ open: false });
    const data = {
      inputField: this.state.inputFields,
      tableName: this.state.tableName
    };
    dispatch(updateTable(this.state.tableName));
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    dispatch(createSchema(this.state.inputFields));

    fetch("/db/" + localStorage.getItem("database") + "/create", init)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  setTableName(tableName) {
    this.setState({ tableName: tableName });
  }

  handleInputChange = (index, event) => {
    const values = [...this.state.inputFields];
    if (event.target.name === "Field") {
      values[index].Field = event.target.value;
    } else if (event.target.name === "Type") {
      values[index].Type = event.target.value;
    } else if (event.target.name === "fieldConstraints") {
      values[index].fieldConstraints = event.target.value;
    }

    this.setState({ inputFields: values });
  };

  handleAddFields = () => {
    const values = [...this.state.inputFields];
    values.push({ Field: "", Type: "char", fieldConstraints: "not_null" });
    this.setState({ inputFields: values });
  };

  handleRemoveFields = index => {
    const values = [...this.state.inputFields];
    values.splice(index, 1);
    this.setState({ inputFields: values });
  };

  render() {
    return (
      <div>
        <Tooltip title="Create Schema" aria-label="add">
          <IconButton
            size="small"
            onClick={this.handleClickOpen}
            aria-label="add"
          >
            <AddIcon style={{ color: "white" }} />
          </IconButton>
        </Tooltip>

        <Dialog
          onClose={this.handleSubmit}
          maxWidth="md"
          aria-labelledby="create-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="dialog-create-schema">Create Table</DialogTitle>
          <DialogContent>
            <TableName setTableName={this.setTableName} />
            <div className="form-row">
              {this.state.inputFields.map((inputField, index) => (
                <Fragment key={`${inputField}~${index}`}>
                  <div className="form-group col-sm-4">
                    <label htmlFor="Field">Field</label>
                    <input
                      onChange={event => this.handleInputChange(index, event)}
                      type="text"
                      className="form-control"
                      id="Field"
                      name="Field"
                      value={inputField.Field}
                    />
                  </div>
                  <div className="form-group col-sm-3">
                    <label htmlFor="Type">Type</label>
                    <NativeSelect
                      onChange={event => this.handleInputChange(index, event)}
                      id="Type"
                      name="Type"
                      value={inputField.Type}
                      className="form-control"
                    >
                      <option value="boolean">BOOLEAN</option>
                      <option value="int">INTEGER</option>
                      <option value="real">REAL</option>
                      <option value="datetime">DATETIME</option>
                      <option value="date">DATE</option>
                      <option value="time">TIME</option>
                      <option value="char">CHAR</option>
                      <option value="varchar">VARCHAR</option>
                      <option value="text">TEXT</option>
                      <option value="timestamp">TIMESTAMP</option>
                    </NativeSelect>
                  </div>
                  <div className="form-group col-sm-3">
                    <label htmlFor="fieldConstraints">Field Constraints</label>
                    <NativeSelect
                      onChange={event => this.handleInputChange(index, event)}
                      id="fieldConstraints"
                      name="fieldConstraints"
                      value={inputField.fieldConstraints}
                      className="form-control"
                    >
                      <option value="primary_key">PRIMARY Key</option>
                      <option value="unique">UNIQUE</option>
                      <option value="check">CHECK</option>
                      <option value="not_null">NOT NULL</option>
                    </NativeSelect>
                  </div>
                  <div className="form-group col-sm-2">
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => this.handleRemoveFields(index)}
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
                </Fragment>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <div className="submit-button">
              <button
                className="btn btn-primary mr-2"
                type="submit"
                onClick={this.handleSubmit}
              >
                create
              </button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = { createSchema };

export const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUnconnected);
