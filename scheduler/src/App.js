import React, { Component, useState } from "react";
import "./App.css";
import Calendar from "./components/calendar";
import Calendar2 from "./components/calendar2";
import Upcoming from "./components/upcoming";

function App () {
  return (
    <React.Fragment>
      <div className="page-setup">
        <nav className="sidebar-shell">
          
        </nav>
        <Upcoming/>
      </div>
    </React.Fragment>
  );
}

export default App;
