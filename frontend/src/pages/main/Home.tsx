import React from "react";

import styles from "./Home.module.css";
import Database from "./Database";
import Console from "./Console";
import classNames from "classnames";

export function Home(): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.console}>
        <div className={styles.header}>
          <div className={styles.buttons}>
            <div className={classNames([styles.button, styles.close])} />
            <div className={classNames([styles.button, styles.minimize])} />
            <div className={classNames([styles.button, styles.fullscreen])} />
          </div>
        </div>
        <div className={styles.con_content} id="console_pane">
          <Console />
        </div>
      </div>
      <div className={styles.database}>
        <Database />
      </div>
    </div>
  );
}
