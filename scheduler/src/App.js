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
            <tr>
              <th>Category 1</th>
              <th>Category 2</th>
              <th>Category 3</th>
            </tr>
            <tr>
              <td className="red-box">Thing 1</td>
              <td className="red-box">Thing 2</td>
              <td>Thing 3</td>
            </tr>
            <tr>
              <td>Thing 4</td>
              <td>Thing 5</td>
              <td>Thing 6</td>
            </tr>
          </table>
        </body>
      </React.Fragment>
    );
  }
}

export default App;
