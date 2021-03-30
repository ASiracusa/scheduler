import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DayBox from "./daybox";
import { v1 as timestamp } from 'uuid';

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
const order = [
    [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]],
    [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]],
    [[1, 2, 3], [4, 5, 6], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]],
    [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]
];

function Upcoming () {
    const [oldOrder, newOrder] = useState(order);
    
    return (
        <React.Fragment>
            <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="calendar-header">:)</div>
                <div className="upcoming-body">
                    <table className="upcoming" cellPadding="0">
                        <tbody>
                            {generateUpcomingDays()}
                        </tbody>
                    </table>
                </div>
            </DragDropContext>
        </React.Fragment>
    );

    function handleOnDragEnd (result) {
        console.log(result);
        if (!result.destination) return;

        const source = document.getElementsByClassName(result.source.droppableId)[0];
        const destination = document.getElementsByClassName(result.destination.droppableId)[0];

        const items = Array.from(oldOrder);
        const [reorderedItem] = items[parseInt(source.getAttribute("week"))][parseInt(source.getAttribute("day"))].splice(result.source.index, 1);
        items[parseInt(destination.getAttribute("week"))][parseInt(destination.getAttribute("day"))].splice(result.destination.index, 0, reorderedItem);
        newOrder(items);
    }

    function generateUpcomingDays () {
        var date = new Date();
        var beginning = new Date();
        beginning.setDate(1);
        var day = Math.floor((date.getDate() + beginning.getDay() - 1) / 7) * 7 - beginning.getDay() + 1;
        var monthContent = [];
    
        var daysInMonth =
          date.getMonth() === 1 && isLeapYear(date.getFullYear())
            ? 29
            : MONTHLENGTHS[date.getMonth()];
    
        var schedule = [];
        for (var w = 0; w < 4; w++) {
          var weekContent = [];
          for (var i = 0; i < 7; i++) {
            if (day <= 0) {
              weekContent.push(
                <td className="day-cell" key={day}>
                    <div className="calendar-space">
                        {day}
                        <button className="add-card-button"> + </button>
                    </div>
                </td>);
            } else {
              if (day > MONTHLENGTHS[date.getMonth()]) {
                date.setMonth((date.getMonth() + 1) % 12);
                day = 1;
              }
              const ts = timestamp();
              weekContent.push(<DayBox key={ts} order={order} week={w} day={day} weekday={i} date={date} createCard={createCard}/>);
            }
            day++;
          }
    
          schedule.push(<tr key={w}>{weekContent}</tr>);
        }

        return schedule;
    }

    function isLeapYear (year) {
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    };

    function createCard(row, column) {
        console.log(row);
        console.log(column);
    }
}

export default Upcoming;
