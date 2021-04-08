import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from "./card";
import { v1 as timestamp } from 'uuid';

function DayBox(props) {
  return (
    <td className="day-cell" key={props.day}>
      <div className={"calendar-space" + ((props.date.getDate() === props.day) ? " calendar-space-today" : "")}>
        {props.day}
        <button className="add-card-button" onClick={() => {props.createCard(props.week, props.weekday)}}> + </button>
        <div>
          <Droppable droppableId={"calendar-space-content-" + props.day + "-" + props.weekday}>
              {(provided) => (
                  <ul className={"card-area calendar-space-content-" + props.day + "-" + props.weekday} {...provided.droppableProps} ref={provided.innerRef} day={props.weekday} week={props.week}>
                      {props.order[props.week][props.weekday].map((val, ind) => {
                          return <Card day={props.day} val={val} ind={ind}/>;
                      })}
                  </ul>
              )}
          </Droppable>
        </div>
      </div>
    </td>
  );
}

export default DayBox;
