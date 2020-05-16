import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Connect from "./connect";
import Create from "./create";
import Insert from "./insert";
import Update from "./update";
import Delete from "./delete";
import Info from "./info";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: "white",
    fontSize: 25,
    width: 60
  }
}));

const SideBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" arial-label="main mailbox folder">
        <ListItem>
          <Connect />
        </ListItem>

        <ListItem>
          <Create />
        </ListItem>

        <ListItem>
          <Insert />
        </ListItem>

        <ListItem>
          <Update />
        </ListItem>

        <ListItem>
          <Delete />
        </ListItem>

        <ListItem>
          <Info />
        </ListItem>
      </List>
    </div>
  );
};

export default SideBar;
