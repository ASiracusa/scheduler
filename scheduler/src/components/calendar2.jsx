import React, { Component } from "react";
import DayBox from "./daybox";
import WeekBox from "./weekbox";
import MonthBox from "./monthbox";

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
  "day-bubble-new",
  "day-bubble-lastmonth",
  "day-bubble-currmonth day-bubble-real",
  "day-bubble-nextmonth",
  "day-bubble-new",
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

class Calendar2 extends Component {
  state = {
    date: null,
    observer: null,
    primaryMonth: null,
    monthBehind: null,
    monthNow: null,
    monthForward: null,
  };

  constructor() {
    super();
    this.state.date = new Date();
    this.state.date.setDate(1);
    this.state.primaryMonth = this.state.date.getMonth();

    this.state.monthBehind = this.generateMonth(-1, -1);
    this.state.monthNow = this.generateMonth(0, 0);
    this.state.monthForward = this.generateMonth(1, 1);
    console.log("hmm");
  }

  componentDidMount() {

    var calendarBody = document.getElementById("calendar-body");;

    var topmostMonth = this.getMonthfromMonth(this.state.date, -1);
    calendarBody.scrollBy(
      0,
      vh * this.getWeeksEndedInMonth(topmostMonth) * 0.25
    );

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

        <div className="calendar-body" id="calendar-body">
            <table className="calendar overflow-y:scroll" cellPadding="0">
                <tbody>{this.state.monthBehind}{this.state.monthNow}{this.state.monthForward}</tbody>
            </table>
        </div>
      </React.Fragment>
    );
  }

  handleMonthChange = (directionMod) => {
    console.log(directionMod);

    this.state.observer.disconnect();

    console.log("handling change");

    // cycles the month index
    if (this.state.date.getMonth() + directionMod > 11)
      this.state.date.setFullYear(this.state.date.getFullYear() + 1);
    if (this.state.date.getMonth() + directionMod < 0)
      this.state.date.setFullYear(this.state.date.getFullYear() - 1);

    // sets the month to new index
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

    // this.setState({ monthBehind: this.generateMonth(-1, -1)});
    // this.setState({ monthNow: this.generateMonth(0, 0)});
    // this.setState({ monthForward: this.generateMonth(1, 1)});

    if (directionMod > 0) {
      this.setState({ monthBehind: this.state.monthNow });
      this.setState({ monthNow: this.state.monthForward });
      this.setState({ monthForward: this.generateMonth(1, 2) });
    } else {
      this.setState({ monthForward: this.state.monthNow });
      this.setState({ monthNow: this.state.monthBehind });
      this.setState({ monthBehind: this.generateMonth(-1, -2) });
    }
    console.log(this.state.monthBehind);
    console.log(this.state.monthNow);
    console.log(this.state.monthForward);

    const newCurrMonth =
      directionMod > 0 ? "day-bubble-nextmonth" : "day-bubble-lastmonth";
    const newOldMonth =
      directionMod < 0 ? "day-bubble-nextmonth" : "day-bubble-lastmonth";

    const alldays = document.querySelectorAll(".day-bubble");
    alldays.forEach((day) => {
      if (day.classList.contains(newCurrMonth)) {
        day.classList.add("day-bubble-currmonth");
        day.classList.add("day-bubble-real");
        day.classList.remove(newCurrMonth);
      } else if (day.classList.contains("day-bubble-currmonth")) {
        day.classList.add(newOldMonth);
        day.classList.remove("day-bubble-currmonth");
        day.classList.remove("day-bubble-real");
      } else if (day.classList.contains("day-bubble-new")) {
        day.classList.add(newCurrMonth);
        day.classList.remove("day-bubble-new");
      } else {
        day.classList.add("day-bubble-confused");
      }
    });

    root.style.setProperty("--day-anim-speed", "500ms");

    this.updateWeekObserver();
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

    weeks.forEach((week) => {
      console.log(week.getAttribute("primarymonth"));
    });

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

  generateMonth = (direction, context) => {
    var date = this.getMonthfromMonth(this.state.date, direction);
    var day = 1 - date.getDay();
    var monthContent = [];

    var lastMonth = this.getMonthfromMonth(date, -1);
    lastMonth.setDate(1);
    var daysInMonth =
      lastMonth.getMonth() === 1 && this.isLeapYear(lastMonth.getFullYear())
        ? 29
        : MONTHLENGTHS[lastMonth.getMonth()];

    while (true) {
      var weekContent = [];
      for (var i = 0; i < 7; i++) {
        if (day <= 0) {
          weekContent.push(<DayBox isCurrentMonth={"day-bubble " + MONTHCLASSES[context + 1]} day={daysInMonth + day} key={"d " + day + " " + date.getMonth() + " " + date.getFullYear()}/>);
        } else {
          if (day > MONTHLENGTHS[date.getMonth()]) {
            return <MonthBox monthContent={monthContent} />;
          }
          var centralMonth = "day-bubble " + MONTHCLASSES[context + 2];
          weekContent.push(<DayBox isCurrentMonth={centralMonth} day={day} key={"d " + day + " " + date.getMonth() + " " + date.getFullYear()} />);
        }
        day++;
      }

      monthContent.push(
        <WeekBox primaryMonth={date.getMonth() % 12} weekContent={weekContent} key={"w " + day + " " + date.getMonth() + " " + date.getFullYear()} />
      );
    }
  }
}

export default Calendar2;
