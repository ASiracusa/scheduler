import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v1 as timestamp } from 'uuid';

function Card(props) {
    var descr;

    return (<Draggable onmouseout={saveDesc} key={timestamp()} draggableId={"" + props.day + "-" + props.ind} index={props.ind}>
        {(provided) => (
            createDesc(provided)
        )}
    </Draggable>);

    function createDesc (provided) {
        descr = <li className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div onClick={editDesc}>
                        item {props.val}
                    </div>
                </li>;
        return (
            descr
        );
    }

    function editDesc () {
        console.log("edit");
    }

    function saveDesc () {
        console.log("save");
    }
}

export default Card;
