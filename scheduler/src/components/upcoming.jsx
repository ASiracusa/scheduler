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
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []],
    [[], [], [], [], [], [], []]
];

function Upcoming (props) {
    const [oldOrder, newOrder] = useState(order);
    const dayDateDict = {};
    
    return (
        <React.Fragment>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <div className="calendar-header">
                <button id="save-json-btn" onClick={saveUpcoming}>
                  Save JSON
                </button>
              </div>
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
        var daysInLastMonth =
          (day <= 0) ? 
            ((date.getMonth() + 11) % 12 === 1 && isLeapYear(date.getFullYear())
              ? 29
              : MONTHLENGTHS[(date.getMonth() + 11) % 12])
            : (date.getMonth() === 1 && isLeapYear(date.getFullYear())
              ? 29
              : MONTHLENGTHS[date.getMonth()]); 
    
        var schedule = [];
        
        for (var w = 0; w < 4; w++) {
          var weekContent = [];

          for (var i = 0; i < 7; i++) {

            const ts = timestamp();

            if (day <= 0) {
              weekContent.push(<DayBox key={ts} order={order} week={w} day={daysInLastMonth + day} weekday={i} date={date} createCard={createCard} editCardDesc={editCardDesc}/>);
              dayDateDict[[daysInLastMonth + day, date.getMonth(), date.getFullYear()]] = [w, i];
            } else {
              if (day > MONTHLENGTHS[date.getMonth()]) {
                date.setMonth((date.getMonth() + 1) % 12);
                day = 1;
              }
              weekContent.push(<DayBox key={ts} order={order} week={w} day={day} weekday={i} date={date} createCard={createCard} editCardDesc={editCardDesc}/>);
              dayDateDict[[day, date.getMonth() + 1, date.getFullYear()]] = [w, i];
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
        const items = Array.from(oldOrder);
        items[row][column].splice(items[row][column].length, 0, "0");
        newOrder(items);
    }

    function editCardDesc(row, column, index, newContent) {
        const items = Array.from(oldOrder);
        items[row][column][index] = newContent;
        newOrder(items);
    }

    function saveUpcoming() {
      var cardsJSON = "{\"cards\":[";
      for (var w = 0; w < 4; w++) {
        for (var d = 0; d < 7; d++) {
          const dateStr = Object.keys(dayDateDict).find(key => dayDateDict[key][0] === w && dayDateDict[key][1] === d);
          for (var c = 0; c < oldOrder[w][d].length; c++) {
            const dss = dateStr.split(",");
            const cardJSON = JSON.stringify({ "desc": oldOrder[w][d][c], "date": dss[0], "month": dss[1], "year": dss[2] });
            console.log(cardJSON);
            cardsJSON += cardJSON + ","
          }
        }
      }
      cardsJSON += "]}";
      console.log(cardsJSON);
    }
}

export default Upcoming;
