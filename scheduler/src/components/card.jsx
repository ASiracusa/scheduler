import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v1 as timestamp } from 'uuid';

function Card(props) {
    return (<Draggable key={timestamp()} draggableId={"" + props.day + "-" + props.ind} index={props.ind}>
        {(provided) => (
            <li className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div contentEditable="true">
                    item {props.val}
                </div>
            </li>
        )}
    </Draggable>);
}

export default Card;
