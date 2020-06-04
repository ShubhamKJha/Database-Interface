import React from "react";
import PermDataSettingSharpIcon from "@material-ui/icons/PermDataSettingSharp";

import { Menu, MenuItem, MenuList } from "@material-ui/core";
import styles from "./Header.module.css";

export function Header(): JSX.Element {
  const handleClick = (e: any) => {};

  return (
    <div data-attr="someattr" className={styles.head}>
      <div className={styles.logo}>
        <h3>
          <span>
            <PermDataSettingSharpIcon fontSize="large" />
          </span>
          My Database Interface
        </h3>
      </div>
      <div className={styles.menu}>
        <MenuList className={styles.menulist}>
          <MenuItem id="profile" onClick={handleClick}>
            Profile
          </MenuItem>
          <MenuItem id="docs" onClick={handleClick}>
            Docs
          </MenuItem>
          <MenuItem id="logout" onClick={handleClick}>
            Logout
          </MenuItem>
        </MenuList>
      </div>
    </div>
  );
}
