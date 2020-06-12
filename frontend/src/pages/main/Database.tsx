import React from "react";
import styles from "./Database.module.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CustomizedTreeView from "../../components/treeView";
import SideBar from "../../components/sidebar";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
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
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function Database() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.database}>
      <div className={styles.side_bar}>
        <SideBar />
      </div>
      <div className={styles.main_view}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Sqlite" {...a11yProps(0)} />
            <Tab label="MySQL" {...a11yProps(1)} />
            <Tab label="MongoDB" {...a11yProps(2)} />
            <Tab label="Postgresql" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <CustomizedTreeView />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomizedTreeView />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CustomizedTreeView />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CustomizedTreeView />
        </TabPanel>
      </div>
    </div>
  );
}
