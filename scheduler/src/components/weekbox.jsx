import React, { Component } from "react";

class WeekBox extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <tr primarymonth={this.props.primaryMonth} className="week-cell">
          {this.props.weekContent}
        </tr>
      </React.Fragment>
    );
  }
}

export default WeekBox;
