import React from 'react';

import styles from './Header.module.css';

export function Header(): JSX.Element {
  return (
    <div data-attr="someattr" className={styles.head}>
      <h3>My Database Interface</h3>
    </div>
  )
}
