import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const order = [1, 2, 3];

function DayBox(props) {
  const [oldOrder, newOrder] = useState(order);
  
  return (
    <td className="day-cell" key={props.day}>
      <div className={"calendar-space" + ((props.date.getDate() === props.day) ? " calendar-space-today" : "")}>
        {props.day}
        <button className="add-card-button"> + </button>
        <div>
          <Droppable droppableId={"calendar-space-content-" + props.day + "-" + props.weekday}>
              {(provided) => (
                  <ul className={"calendar-space-content" + props.day + "-" + props.weekday} {...provided.droppableProps} ref={provided.innerRef}>
                      {oldOrder.map((ind) => {
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
