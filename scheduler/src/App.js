import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <body className="page-setup">
          <nav className="sidebar-shell">Contents</nav>

          <table className="calendar">
            <tr className="week-cell">
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
            </tr>
            <tr className="week-cell">
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
              <td className="day-cell">
                <body className="day-bubble"></body>
              </td>
            </tr>
          </table>
        </body>
      </React.Fragment>
    );
  }
}

export default App;
