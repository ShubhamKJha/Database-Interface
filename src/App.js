import React, { Component } from "react";
import "./App.css";
import List from "./pages/List";
import Main from "./pages/Main";
import { Switch, Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import history from "./utils/history";
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/list" component={List} />
        <Route path="/home" component={Main} />
        <Route exact path="/" component={LandingPage} />
      </Router>
    );
  }
}

export default App;
