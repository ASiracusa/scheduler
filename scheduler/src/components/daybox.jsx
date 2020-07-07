import React, { Component } from "react";

class DayBox extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <td className="day-cell">
          <div className={this.props.isCurrentMonth}>{this.props.day}</div>
        </td>
      </React.Fragment>
    );
  }
}

export default DayBox;
