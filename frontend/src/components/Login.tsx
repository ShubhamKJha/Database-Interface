import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import history from "../utils/history";

interface state {
  Email: string;
  Password: string;
  disabled: boolean;
}

// const navigation = useNavigation();

class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      Email: "",
      Password: "",
      disabled: false,
    };
  }

  handleSubmit() {
    this.setState({ disabled: true });
    const DBConfig = {
      email: this.state.Email,
      password: this.state.Password,
    };
    // TODO: send the object via fetch
    const data = DBConfig;
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/auth/login", init)
      .then((res) => res.json())
      .then((data) => {
        data = JSON.parse(data);
        sessionStorage.setItem("jwt_token", data["access_token"]);
        this.setState({ disabled: false });
        history.push("/home");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(Object.assign({}, this.state, { [name]: value }));
  }

  render() {
    return (
      <div style={{ width: 400 }}>
        <div className="form-col">
          <div className="form-group">
            <label>Email: </label>
            <input
              name="Email"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.Email}
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
          onClick={this.handleSubmit}
        >
          Login
        </Button>
      </div>
    );
  }
}
export default Login;
