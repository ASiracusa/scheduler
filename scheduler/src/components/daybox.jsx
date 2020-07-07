import React, { Component } from "react";

class DayBox extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <td className="day-cell">
          <body className={this.props.isCurrentMonth}>{this.props.day}</body>
        </td>
      </React.Fragment>
    );
  }
}

export default DayBox;
