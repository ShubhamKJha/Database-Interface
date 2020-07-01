import React from "react";
import styles from "./Database.module.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CustomizedTreeView from "../../components/treeView";
import SideBar from "../../components/sidebar";
import { dummySchema } from "../../components/dummySchema";
import { store } from "../store";

function select(state) {
  return state.dataReducer;
}

export let currentValue;
let mySqlSchema = {
  DatabaseName: "",
  Tables: []
};

function handleChangetree() {
  let previousValue = currentValue;
  currentValue = select(store.getState());

  if (previousValue !== currentValue) {
    console.log(
      "Some deep nested property changed from",
      previousValue,
      "to",
      currentValue
    );
    mySqlSchema.DatabaseName = currentValue.DatabaseName;
    // mySqlSchema.Tables
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className={styles.databasePanel}>
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      databaseSchema: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  componentDidUpdate(prevProps, nextProps, snapshot) {
    const unsubscribe = store.subscribe(handleChangetree);
    unsubscribe();
  }

  render() {
    return (
      <div className={styles.database}>
        <div className={styles.side_bar}>
          <SideBar />
        </div>
        <div className={styles.main_view}>
          <AppBar position="static">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Sqlite" {...a11yProps(0)} />
              <Tab label="MySQL" {...a11yProps(1)} />
              <Tab label="MongoDB" {...a11yProps(2)} />
              <Tab label="Postgresql" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <CustomizedTreeView database={dummySchema} />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <CustomizedTreeView database={dummySchema} />
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
            <CustomizedTreeView database={dummySchema} />
          </TabPanel>
          <TabPanel value={this.state.value} index={3}>
            <CustomizedTreeView database={dummySchema} />
          </TabPanel>
        </div>
      </div>
    );
  }
}
