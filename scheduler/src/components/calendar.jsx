import React, { Component } from "react";
import DayBox from "./daybox";
import WeekBox from "./weekbox";

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

const MONTHCLASSES = [
  "day-bubble-lastmonth",
  "day-bubble-currmonth",
  "day-bubble-nextmonth",
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

const options = {
  threshold: 1,
  rootMargin: "-30% 0% -30% 0%",
};

let root = document.documentElement;

class Calendar extends Component {
  state = {
    date: null,
    observer: null,
    primaryMonth: null,
  };

  constructor() {
    super();
    this.state.date = new Date();
    this.state.date.setDate(1);
    this.state.primaryMonth = this.state.date.getMonth();
  }

  componentDidMount() {
    var calendarBody = document.getElementById("calendar-body");

    var topmostMonth = this.getMonthfromMonth(this.state.date, -1);
    calendarBody.scrollBy(
      0,
      vh * this.getWeeksEndedInMonth(topmostMonth) * 0.25
    );

    const currmonth = document.querySelectorAll(".day-bubble-currmonth");
    currmonth.forEach((oldday) => {
      console.log(oldday);

      oldday.classList.add("day-bubble-real");
    });

    this.updateWeekObserver();
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
    this.state.observer.disconnect();

    if (this.state.date.getMonth() + directionMod > 11)
      this.state.date.setFullYear(this.state.date.getFullYear() + 1);
    if (this.state.date.getMonth() + directionMod < 0)
      this.state.date.setFullYear(this.state.date.getFullYear() - 1);

    this.state.date.setMonth(
      (this.state.date.getMonth() + directionMod + 12) % 12
    );
    const primaryMonth = this.state.date.getMonth();

    var calendarBody = document.getElementById("calendar-body");

    var topmostMonth = this.getMonthfromMonth(
      this.state.date,
      directionMod < 0 ? -1 : -2
    );
    calendarBody.scrollBy(
      0,
      -directionMod * vh * this.getWeeksEndedInMonth(topmostMonth) * 0.25
    );

    this.setState({ date: this.state.date, primaryMonth: primaryMonth });

    root.style.setProperty("--day-anim-speed", "0ms");

    const monthIdentifier =
      directionMod > 0 ? "day-bubble-lastmonth" : "day-bubble-nextmonth";
    var olddays = [];
    var newdays = [];

    const allmonths = document.querySelectorAll(".day-bubble");
    allmonths.forEach((oldday) => {
      if (oldday.classList.contains(monthIdentifier)) {
        oldday.classList.add("day-bubble-real");
        olddays.push(oldday);
      } else if (oldday.classList.contains("day-bubble-currmonth")) {
        newdays.push(oldday);
        oldday.classList.remove("day-bubble-real");
      } else {
        oldday.classList.remove("day-bubble-real");
      }
      void oldday.offsetWidth;
    });

    root.style.setProperty("--day-anim-speed", "500ms");

    olddays.forEach((oldday) => {
      oldday.classList.remove("day-bubble-real");
    });

    newdays.forEach((oldday) => {
      oldday.classList.add("day-bubble-real");
    });

    this.updateWeekObserver();
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
          var centralMonth = "day-bubble " + MONTHCLASSES[currMonthMod];
          weekContent.push(<DayBox isCurrentMonth={centralMonth} day={day} />);
        }
        day++;
      }

      calendarContent.push(
        <tr
          primarymonth={(date.getMonth() + currMonthMod + 12) % 12}
          className="week-cell"
        >
          {weekContent}
        </tr>
      );
    }

    return (
      <div className="calendar-body" id="calendar-body">
        <table className="calendar overflow-y:scroll" cellPadding="0">
          <tbody>{calendarContent}</tbody>
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

  getWeeksEndedInMonth = (date) => {
    date.setDate(1);
    var daysInMonth =
      date.getMonth() === 1 && this.isLeapYear(date.getFullYear())
        ? 29
        : MONTHLENGTHS[date.getMonth()];

    var w = Math.floor((date.getDay() + daysInMonth) / 7);
    return w;
  };

  updateWeekObserver = () => {
    if (this.state.observer !== null) this.state.observer.disconnect();

    const weeks = document.querySelectorAll(".week-cell");
    console.log(weeks);

    const calendarObject = this;

    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const monthDiff =
            calendarObject.state.primaryMonth -
            parseInt(entry.target.getAttribute("primarymonth"));
          if (monthDiff !== 0) {
            if (monthDiff === -1 || monthDiff === 11)
              calendarObject.handleMonthChange(1);
            else calendarObject.handleMonthChange(-1);
          }
        }
      });
    }, options);

    this.setState({ observer: observer });

    for (let week of weeks) {
      observer.observe(week);
    }
  };
}

export default Calendar;
