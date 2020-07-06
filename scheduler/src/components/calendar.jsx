import React, { Component } from "react";
import DayBox from "./daybox";

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

const MONTHLENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class Calendar extends Component {
  state = {
    date: null,
  };

  constructor() {
    super();
    this.state.date = new Date();
    this.state.date.setDate(1);
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
            {MONTHS[this.state.date.getMonth()]} {this.state.date.getFullYear()}
          </div>
        </div>

        {this.renderCalendar()}
      </React.Fragment>
    );
  }

  handleMonthChange = (directionMod) => {
    if (this.state.date.getMonth() + directionMod > 11)
      this.state.date.setFullYear(this.state.date.getFullYear() + 1);
    if (this.state.date.getMonth() + directionMod < 0)
      this.state.date.setFullYear(this.state.date.getFullYear() - 1);

    this.state.date.setMonth(
      (this.state.date.getMonth() + directionMod + 12) % 12
    );

    this.setState({ date: this.state.date });
  };

  renderCalendar = () => {
    var calendarContent = [];
    for (
      var day = 1 - this.state.date.getDay();
      day <= MONTHLENGTHS[this.state.date.getMonth()];
      day += 7
    ) {
      var weekContent = [];
      for (var i = 0; i < 7; i++) {
        var real =
          "day-bubble day-bubble-" +
          (day + i > 0 && day + i <= MONTHLENGTHS[this.state.date.getMonth()]
            ? "real"
            : "fake");
        weekContent.push(
          <td className="day-cell">
            <div className={real}>{day + i}</div>
          </td>
        );
      }
      calendarContent.push(<tr className="week-cell">{weekContent}</tr>);
    }
    calendarContent.push(<tr></tr>);
    return (
      <table className="calendar overflow-y:scroll">{calendarContent}</table>
    );
  };
}

export default Calendar;
