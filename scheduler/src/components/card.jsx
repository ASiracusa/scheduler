import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v1 as timestamp } from 'uuid';

function Card(props) {
    var descTs;
    var descDivTs;

    return (<Draggable key={timestamp()} draggableId={"" + props.day + "-" + props.ind} index={props.ind}>
        {(provided) => (
            createDesc(provided)
        )}
    </Draggable>);

    function createDesc (provided) {
        descTs = timestamp();
        descDivTs = timestamp();
        const descrTags = <li id={descTs} className="card" onMouseOut={saveDesc} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} {...provided.draggableProps.style}>
            <div id={descDivTs} onClick={editDesc}>
                {props.val}
            </div>
        </li>;
        return (descrTags);
    }

    function editDesc () {
        document.getElementById(descTs).setAttribute("contentEditable", "true");
        console.log("Edit");
    }

    function saveDesc () {
        document.getElementById(descTs).setAttribute("contentEditable", "false");
        props.editCardDesc(props.ind, document.getElementById(descDivTs).innerText);
        console.log("Save");
    }
}

export default Card;
