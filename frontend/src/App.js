import React from "react";
import "./App.css";
import Main from "./pages/Main";
import { Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import history from "./utils/history";
import Profile from "./pages/main/Profile";
import Docs from "./pages/main/Docs";
class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/home" component={Main} />
        <Route path="/profile" component={Profile} />
        <Route path="/docs" component={Docs} />
        <Route exact path="/" component={LandingPage} />
      </Router>
    );
  }
}

export default App;
