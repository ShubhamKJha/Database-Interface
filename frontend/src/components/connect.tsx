import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import LinkIcon from "@material-ui/icons/Link";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import NativeSelect from "@material-ui/core/NativeSelect";

class Connect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      Endpoint: "",
      UserName: "",
      Password: "",
      Database: "mysql",
      DatabaseName: "",
      color: "white"
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
    const DBConfig = {
      Endpoint: this.state.Endpoint,
      Username: this.state.UserName,
      Password: this.state.Password,
      Database: this.state.Database,
      DatabaseName: this.state.DatabaseName
    };
    // TODO: send the object via fetch
    const data = DBConfig;
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("/db/" + this.state.Database + "/connect", init)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data["result"] == "OK") {
          localStorage.setItem("database", this.state.Database);
          this.setState({ color: "green" });
        }
      })
      .catch(error => {
        this.setState({ color: "red" });
        console.error("Error:", error);
      });
  }

  handleClickOpen() {
    this.setState({ show: true });
  }

  handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <Tooltip title="Connect" aria-label="add">
          <IconButton
            size="small"
            onClick={this.handleClickOpen}
            aria-label="add"
          >
            <LinkIcon style={{ color: this.state.color }} />
          </IconButton>
        </Tooltip>
        <Dialog
          onClose={this.handleClose}
          maxWidth="md"
          aria-labelledby="connect-dialog-title"
          open={this.state.show}
        >
          <DialogTitle id="connect-dialog-title">
            Choose your options
          </DialogTitle>
          <DialogContent>
            <div className="form-col">
              <div className="form-group">
                <label>EndPoint:</label>
                <input
                  name="Endpoint"
                  type="text"
                  className="form-control"
                  onChange={this.handleInputChange}
                  value={this.state.Endpoint}
                />
              </div>
              <div className="form-group">
                <label>Database</label>
                <NativeSelect
                  value={this.state.database}
                  className="form-control"
                  name="database"
                  onChange={this.handleInputChange}
                >
                  <option value="mysql">MySQL</option>
                  <option value="sqlite">Sqlite</option>
                  <option value="mongodb">MongoDB</option>
                  <option value="postgresql">postgresql</option>
                </NativeSelect>
              </div>
              <div className="form-group">
                <label>User Name:</label>
                <input
                  name="UserName"
                  type="text"
                  className="form-control"
                  onChange={this.handleInputChange}
                  value={this.state.UserName}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  name="Password"
                  className="form-control"
                  type="text"
                  onChange={this.handleInputChange}
                  value={this.state.Password}
                />
              </div>
              <div className="form-group">
                <label>Database Name:</label>
                <input
                  name="DatabaseName"
                  className="form-control"
                  type="text"
                  onChange={this.handleInputChange}
                  value={this.state.DatabaseName}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              autoFocus
              color="primary"
              onClick={this.handleClose}
            >
              Connect
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Connect;
