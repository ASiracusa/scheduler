import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function DayBox(props) {
  return (
    <td className="day-cell" key={props.day}>
      <div className={"calendar-space" + ((props.date.getDate() === props.day) ? " calendar-space-today" : "")}>
        {props.day}
        <button className="add-card-button"> + </button>
        <div>
          <Droppable droppableId={"calendar-space-content-" + props.day + "-" + props.weekday}>
              {(provided) => (
                  <ul className={"calendar-space-content-" + props.day + "-" + props.weekday} {...provided.droppableProps} ref={provided.innerRef} day={props.weekday} week={props.week}>
                      {props.order[props.week][props.weekday].map((ind) => {
                          return (<Draggable key={"" + props.day + "-" + ind} draggableId={"" + props.day + "-" + ind} index={ind - 1}>
                              {(provided) => (
                                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                      item {ind}
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
