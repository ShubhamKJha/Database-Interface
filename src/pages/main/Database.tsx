import React from 'react';
import styles from "./Database.module.css";
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import LinkIcon from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: 'white',
    fontSize: 25,
    width: 40,
  },
}));


export default function Database() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.database}>
      <div className={styles.side_bar}>
      <List component="nav" arial-label="main mailbox folder">
        <ListItem button >
        <Tooltip title="Link">
          <ListItemIcon>
            <LinkIcon className={classes.root}/>
          </ListItemIcon>
          </Tooltip>
        </ListItem>

        <ListItem button>
        <Tooltip title="Drafts">
          <ListItemIcon>
            <DraftsIcon className={classes.root}/>
          </ListItemIcon>
          </Tooltip>
        </ListItem>

        <ListItem button>
        <Tooltip title="Update">
          <ListItemIcon>
            <UpdateIcon className={classes.root}/>
          </ListItemIcon>
          </Tooltip>
        </ListItem>

        <ListItem button>
        <Tooltip title="Delete">
          <ListItemIcon>
            <DeleteIcon className={classes.root}/>
          </ListItemIcon>
          </Tooltip>
        </ListItem>

        <ListItem button>
        <Tooltip title="Info">
          <ListItemIcon>
            <InfoIcon className={classes.root}/>
          </ListItemIcon>
          </Tooltip>
        </ListItem>
      </List>
      </div>
      <div className={styles.main_view}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Sqlite" {...a11yProps(0)} />
            <Tab label="MySQL" {...a11yProps(1)} />
            <Tab label="MongoDB" {...a11yProps(2)} />
            <Tab label="Postgresql" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Sqlite Panel
        </TabPanel>
        <TabPanel value={value} index={1}>
          Mysql Panel
        </TabPanel>
        <TabPanel value={value} index={2}>
          Mongodb Panle
        </TabPanel>
        <TabPanel value={value} index={3}>
          Postgresql Panel
        </TabPanel>
      </div>
    </div>
  );
}
