import React from "react";
import Button from "@material-ui/core/Button";
import history from "../utils/history";

class SignUp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      Endpoint: "",
      UserName: "",
      Password: "",
      disabled: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClose() {
    this.setState({ disabled: true });
    const DBConfig = {
      email: this.state.Email,
      username: this.state.UserName,
      password: this.state.Password
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
    fetch("/auth/signup", init)
      .then(res => res.json())
      .then(data => {
        this.setState({ disabled: false });
        console.log(data);
        history.push("/");
      })
      .catch(error => {
        console.error("Error:", error);
      });
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
      <div style={{ width: 400 }}>
        <div className="form-col">
          <div className="form-group">
            <label>Email:</label>
            <input
              name="Email"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.Email}
            />
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
              type="password"
              onChange={this.handleInputChange}
              value={this.state.Password}
            />
          </div>
        </div>
        <Button
          disabled={this.state.disabled}
          variant="contained"
          color="primary"
          onClick={this.handleClose}
        >
          SignUp
        </Button>
      </div>
    );
  }
}

export default SignUp;
