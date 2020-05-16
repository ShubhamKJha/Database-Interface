import React, { useState, Component, Fragment } from "react";
import UpdateIcon from "@material-ui/icons/Update";
import "bootstrap/dist/css/bootstrap.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import NativeSelect from '@material-ui/core/NativeSelect';
// import {createSchema} from '../pages/actions/schema-create-action';
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { dummySchema } from "./dummySchema";

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      display: "flex",
      flexDirection: "row"
    }
  })
);

class Update extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      values: [dummySchema]
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddFields = this.handleAddFields.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveFields = this.handleRemoveFields.bind(this);
  }

  handleInputChange(event: any, index: any) {
    const val = [...this.state.values[index]].map(object => {
      if (object.fieldName === event.target.name) {
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
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  // function to handle operations required for submission
  handleSubmit(e: any) {
    e.preventDefault();
    this.setState({ open: false });
  }

  handleAddFields() {
    // console.log("Here data will be pushed")
    const values = [...this.state.values];
    values.push(dummySchema.slice());
    this.setState({ values: values });
  }

  handleRemoveFields(index: any) {
    // console.log(index, "this index will be removed");
    const values = [...this.state.values];
    console.log("Pressed");
    values.splice(index, 1);
    this.setState({ values: values });
  }

  render() {
    return (
      <div>
        <Tooltip title="Update">
          <IconButton size="small" aria-label="add">
            <UpdateIcon style={{ color: "white" }} />
          </IconButton>
        </Tooltip>

        <Dialog
          onClose={this.handleClose}
          maxWidth="md"
          aria-labelledby="create-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="dialog-create-schema">Insert Data</DialogTitle>
          <DialogContent className="form-col">
            {this.state.values.map((data: any, parentIndex: any) => (
              <Fragment key={`${data}~${parentIndex}`}>
                <div className="form-row">
                  {data.map((fm: any, index: any) => (
                    <div key={`${index}`} className="form-group col-sm-2">
                      <label htmlFor={fm.fieldName}>
                        {fm.fieldName}
                        <input
                          onChange={e => this.handleInputChange(e, parentIndex)}
                          type="text"
                          className="form-control"
                          id={`${fm.fieldName}~${parentIndex}`}
                          name={fm.fieldName}
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
              </Fragment>
            ))}
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

export default Update;
