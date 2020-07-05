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
    month: 0,
    year: 0,
  };

  constructor() {
    super();
    var d = new Date();
    this.state.month = d.getMonth();
    this.state.year = d.getFullYear();
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
          <div className="calendar-header">
            {MONTHS[this.state.month]} {this.state.year}
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleMonthChange = (directionMod) => {
    const month = (this.state.month + directionMod + 12) % 12;
    if (this.state.month + directionMod > 11) this.state.year++;
    if (this.state.month + directionMod < 0) this.state.year--;
    this.setState({ month, year: this.state.year });
  };
}

export default Calendar;
