import React, { Component } from "react";
import "./App.css";
import List from "./pages/List";
import Main from "./pages/Main";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path="/list" component={List} />
          <Route path="/" component={Main} />
        </Switch>
      </div>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
