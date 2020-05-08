import React from 'react';

import styles from './Main.module.css';

import { Header } from '../components/Header';
import { GradientLine } from '../components/GradientLine';
import { Footer } from '../components/Footer';
import { Home } from './main/Home';

function Main(): JSX.Element {
  return (
    <div className={styles.main}>
      <Header />
      <GradientLine />
      <Home />
      <Footer />
    </div>
  )
}

export default Main;
