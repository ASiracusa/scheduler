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

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

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

        {this.renderInfiniteCalendar()}
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

    var calendarBody = document.getElementById("calendar-body");
    calendarBody.scrollBy(0, vh * 4 * 0.25);
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
        weekContent.push(<DayBox isCurrentMonth={real} day={day + i} />);
      }
      calendarContent.push(<tr className="week-cell">{weekContent}</tr>);
    }
    calendarContent.push(<tr></tr>);
    return (
      <div className="calendar-body">
        <table className="calendar overflow-y:scroll">{calendarContent}</table>
      </div>
    );
  };

  renderInfiniteCalendar = () => {
    const MONTH_MOD_END = 2;

    var currMonthMod = 0;
    var date = this.getMonthfromMonth(this.state.date, -1);
    var day = 1 - date.getDay();

    var calendarContent = [];
    while (currMonthMod <= MONTH_MOD_END) {
      var weekContent = [];
      for (var i = 0; i < 7; i++) {
        if (day <= 0 || currMonthMod > MONTH_MOD_END) {
          weekContent.push(<td></td>);
        } else {
          if (day > MONTHLENGTHS[(date.getMonth() + currMonthMod + 12) % 12]) {
            currMonthMod++;
            day = 1;
            if (currMonthMod === MONTH_MOD_END + 1) break;
          }
          weekContent.push(
            <DayBox isCurrentMonth="day-bubble day-bubble-real" day={day} />
          );
        }
        day++;
      }
      calendarContent.push(<tr className="week-cell">{weekContent}</tr>);
    }

    return (
      <div className="calendar-body" id="calendar-body">
        <table
          className="calendar overflow-y:scroll"
          cellspacing="0"
          cellpadding="0"
        >
          {calendarContent}
        </table>
      </div>
    );
  };

  isLeapYear = (year) => {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  };

  getMonthfromMonth = (date, direction) => {
    var newDate = new Date(date.getFullYear(), date.getMonth());

    if (date.getMonth() + direction > 11)
      newDate.setFullYear(date.getFullYear() + 1);
    if (date.getMonth() + direction < 0)
      newDate.setFullYear(date.getFullYear() - 1);

    newDate.setMonth((date.getMonth() + direction + 12) % 12);

    return newDate;
  };
}

export default Calendar;
