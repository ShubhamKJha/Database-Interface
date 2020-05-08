import React from 'react';

import styles from './Home.module.css';
import Database  from './Database';
import Console from './Console';


export function Home(): JSX.Element {
  return (
    <div className={styles.main}>
      <div className={styles.console}>
        <Console />
      </div>
      <div className={styles.database}>
        <Database />
      </div>
    </div>
  )
}
