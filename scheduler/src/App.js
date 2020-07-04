import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <span className="badge badge-primary">Something</span>
          <table class="table table-dark">
            <tr>
              <th>Category 1</th>
              <th>Category 2</th>
              <th>Category 3</th>
            </tr>
            <tr>
              <td>Thing 1</td>
              <td>Thing 2</td>
              <td>Thing 3</td>
            </tr>
            <tr>
              <td>Thing 4</td>
              <td>Thing 5</td>
              <td>Thing 6</td>
            </tr>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
