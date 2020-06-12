import React from "react";
import styles from "./Landing.module.css";
import { Toolbar, Typography, Tabs, Tab, Box } from "@material-ui/core";
import Login from "./Login";
import PermDataSettingSharpIcon from "@material-ui/icons/PermDataSettingSharp";
import SignUp from "./Signup";

function TabPanel(props) {
  const { children, index, value, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      area-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.a11Props = this.a11Props.bind(this);
  }

  a11Props = index => {
    return {
      id: `auth-${index}`,
      "area-controls": `tabpanel-${index}`
    };
  };
  handleChange = (event, newValue) => {
    this.setState({ values: newValue });
  };

  render() {
    return (
      <div className={styles.main}>
        {/* <AppBar position="static"> */}
        <Toolbar className={styles.toolbar}>
          <span>
            <PermDataSettingSharpIcon />
          </span>
          <Typography variant="h6" className={styles.title}>
            Database Interface
          </Typography>
        </Toolbar>
        {/* </AppBar> */}
        <div className={styles.body}>
          <div className={styles.part1}>
            <div className={styles.para1}>
              <h1>Let's ease our way to handle databases</h1>
            </div>
            <div className={styles.para1}>
              <h4>Single Platform, Multi Database!!</h4>
            </div>
          </div>
          <div className={styles.part2}>
            <div>
              <Tabs
                className={styles.tabs}
                value={this.state.values}
                onChange={this.handleChange}
              >
                <Tab label="Login" {...this.a11Props(0)} />
                <Tab label="Signup" {...this.a11Props(1)} />
              </Tabs>
            </div>
            <div>
              <TabPanel value={this.state.values} index={0}>
                <Login />
              </TabPanel>
              <TabPanel value={this.state.values} index={1}>
                <SignUp />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
