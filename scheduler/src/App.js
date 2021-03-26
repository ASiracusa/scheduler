import React, { Component } from "react";
import "./App.css";
import Calendar from "./components/calendar";
import Calendar2 from "./components/calendar2";
import Upcoming from "./components/upcoming";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="page-setup">
          <nav className="sidebar-shell">Contents</nav>
          <Upcoming />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
