import React, { Component } from "react";

class MonthBox extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        {this.props.monthContent}
      </React.Fragment>
    );
  }
}

export default MonthBox;
