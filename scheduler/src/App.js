import React, { Component } from "react";
import "./App.css";
import Calendar from "./components/calendar";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <body className="page-setup">
          <nav className="sidebar-shell">Contents</nav>
          <Calendar />
        </body>
      </React.Fragment>
    );
  }
}

export default App;
