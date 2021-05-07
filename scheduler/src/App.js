import React, { Component, useState } from "react";
import "./App.css";
import Calendar from "./components/calendar";
import Calendar2 from "./components/calendar2";
import Upcoming from "./components/upcoming";

function App () {
  const [oldOrder, newOrder] = useState([]);

  return (
    <React.Fragment>
      <div className="page-setup">
        <nav className="sidebar-shell">
          <button id="save-json-btn" onClick={saveUpcoming}>
            Save JSON
          </button>
        </nav>
        <Upcoming updateUpcoming={updateUpcoming}/>
      </div>
    </React.Fragment>
  );

  function saveUpcoming() {
    for (var w = 0; w < 4; w++) {
      for (var d = 0; d < 7; d++) {
        const dateStr = Object.keys(oldOrder).find(key => oldOrder[key] === [w, d]);
        for (var c = 0; c < oldOrder[w][d].length; c++) {
          console.log(dateStr);
        }
      }
    }
  }

  function updateUpcoming(lowerState) {
    newOrder(lowerState);
  }
}

export default App;
