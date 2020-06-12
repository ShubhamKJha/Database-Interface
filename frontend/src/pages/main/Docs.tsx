import React from "react";
import { Header } from "../../components/Header";
import { GradientLine } from "../../components/GradientLine";
import { Footer } from "../../components/Footer";
import styles from "./Docs.module.css";
// import ReactMarkdown from "react-markdown";

class Docs extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        <Header />
        <GradientLine />
        <div className="docs"></div>
        <Footer />
      </div>
    );
  }
}

export default Docs;
