import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v1 as timestamp } from 'uuid';

function DayBox(props) {
  return (
    <td className="day-cell" key={props.day}>
      <div className={"calendar-space" + ((props.date.getDate() === props.day) ? " calendar-space-today" : "")}>
        {props.day}
        <button className="add-card-button"> + </button>
        <div>
          <Droppable droppableId={"calendar-space-content-" + props.day + "-" + props.weekday}>
              {(provided) => (
                  <ul className={"card-area calendar-space-content-" + props.day + "-" + props.weekday} {...provided.droppableProps} ref={provided.innerRef} day={props.weekday} week={props.week}>
                      {props.order[props.week][props.weekday].map((val, ind) => {
                          return (<Draggable key={timestamp()} draggableId={"" + props.day + "-" + ind} index={ind}>
                              {(provided) => (
                                  <li className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                      item {val}
                                  </li>
                              )}
                          </Draggable>);
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
