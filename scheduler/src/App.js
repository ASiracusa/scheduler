import React, { Component } from "react";
import "./App.css";
import Calendar from "./components/calendar";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="page-setup">
          <nav className="sidebar-shell">Contents</nav>
          <Calendar />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
