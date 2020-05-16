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

const Create = () => {
  const [inputFields, setInputFields] = useState([
    { fieldName: "", fieldType: "char", fieldConstraints: "" }
  ]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setOpen(false);
    const data = inputFields;
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("/db/create", init)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (index: any, event: any) => {
    const values = [...inputFields];
    if (event.target.name === "fieldName") {
      values[index].fieldName = event.target.value;
    } else if (event.target.name === "fieldType") {
      values[index].fieldType = event.target.value;
    } else if (event.target.name === "fieldConstraints") {
      values[index].fieldConstraints = event.target.value;
    }

    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ fieldName: "", fieldType: "char", fieldConstraints: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index: any) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div>
      <Tooltip title="Create Schema" aria-label="add">
        <IconButton size="small" onClick={handleClickOpen} aria-label="add">
          <AddIcon style={{ color: "white" }} />
        </IconButton>
      </Tooltip>

      <Dialog
        onClose={handleSubmit}
        maxWidth="md"
        aria-labelledby="create-dialog-title"
        open={open}
      >
        <DialogTitle id="dialog-create-schema">Create Schema</DialogTitle>
        <DialogContent>
          <div className="form-row">
            {inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <div className="form-group col-sm-4">
                  <label htmlFor="fieldName">Field Name</label>
                  <input
                    onChange={event => handleInputChange(index, event)}
                    type="text"
                    className="form-control"
                    id="fieldName"
                    name="fieldName"
                    value={inputField.fieldName}
                  />
                </div>
                <div className="form-group col-sm-3">
                  <label htmlFor="fieldType">Field Type</label>
                  <NativeSelect
                    onChange={event => handleInputChange(index, event)}
                    id="fieldType"
                    name="fieldType"
                    value={inputField.fieldType}
                    className="form-control"
                  >
                    <option value="boolean">BOOLEAN</option>
                    <option value="char">CHAR</option>
                    <option value="varchar">VARCHAR</option>
                    <option value="text">TEXT</option>
                    <option value="integer">INTEGER</option>
                    <option value="numeric">NUMERIC</option>
                    <option value="date">DATE</option>
                    <option value="timestamp">TIMESTAMP</option>
                    <option value="time">TIME</option>
                  </NativeSelect>
                </div>
                <div className="form-group col-sm-3">
                  <label htmlFor="fieldConstraints">Field Constraints</label>
                  <NativeSelect
                    onChange={event => handleInputChange(index, event)}
                    id="fieldConstraints"
                    name="fieldConstraints"
                    value={inputField.fieldConstraints}
                    className="form-control"
                  >
                    <option value="primary_key">PRIMARY Key</option>
                    <option value="foreign_key">FOREIGN KEY</option>
                    <option value="unique">UNIQUE</option>
                    <option value="check">CHECK</option>
                    <option value="not_null">NOT NULL</option>
                  </NativeSelect>
                </div>
                <div className="form-group col-sm-2">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleAddFields()}
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
              onClick={handleSubmit}
            >
              create
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Create;
