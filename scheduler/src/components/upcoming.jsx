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
const MONTHLENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

class Upcoming extends Component {

    state = {
        schedule: null,
    };

    constructor() {
        super();
        const numbers = [1, 2, 3, 4, 5, 6, 7];
        // this.state.schedule = []
        // for (var i = 0; i < 4; i++) {
        //     const listItems = numbers.map((number) =>
        //         <td className="day-cell">
        //             <div className="calendar-space">{number}</div>
        //         </td>
        //     );
        //     this.state.schedule.push(<tr>{listItems}</tr>);
        // }

        this.generateUpcomingDays();
    }

    componentDidMount() {
    }

    render() {
        return (
            <React.Fragment>
                <div className="calendar-header">:)</div>
                <div className="upcoming-body">
                    <table className="upcoming" cellPadding="0">
                        <tbody>
                            {this.state.schedule}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }

    generateUpcomingDays = () => {
        var date = new Date();
        var beginning = new Date();
        beginning.setDate(1);
        var day = Math.floor((date.getDate() - 1) / 7) * 7 - beginning.getDay() + 1;
        var monthContent = [];
    
        var daysInMonth =
          date.getMonth() === 1 && this.isLeapYear(date.getFullYear())
            ? 29
            : MONTHLENGTHS[date.getMonth()];
    
        this.state.schedule = [];
        for (var w = 0; w < 4; w++) {
          var weekContent = [];
          for (var i = 0; i < 7; i++) {
            if (day <= 0) {
              weekContent.push(
                <td className="day-cell">
                    <div className="calendar-space">{day}</div>
                </td>);
            } else {
              if (day > MONTHLENGTHS[date.getMonth()]) {
                date.setMonth((date.getMonth() + 1) % 12);
                day = 1;
              }
              weekContent.push(
                <td className="day-cell">
                    <div className={"calendar-space" + ((date.getDate() === day) ? " calendar-space-today" : "")}>{day}</div>
                </td>);
            }
            day++;
          }
    
          this.state.schedule.push(<tr>{weekContent}</tr>);
        }
    }

    isLeapYear = (year) => {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    };
}

export default Upcoming;
