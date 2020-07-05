import React, { Component } from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class Calendar extends Component {
  state = {
    monthIndex: 7,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <button
            onClick={() => {
              this.handleMonthChange(-1);
            }}
            className="month-button float-left"
          >
            Last Month
          </button>

          <button
            onClick={() => {
              this.handleMonthChange(1);
            }}
            className="month-button float-right"
          >
            Next Month
          </button>
          <div className="calendar-header">{MONTHS[this.state.monthIndex]}</div>
        </div>
      </React.Fragment>
    );
  }

  handleMonthChange = (directionMod) => {
    const monthIndex = (this.state.monthIndex + directionMod + 12) % 12;
    this.setState({ monthIndex });
  };
}

export default Calendar;
