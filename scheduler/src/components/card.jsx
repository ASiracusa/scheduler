import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v1 as timestamp } from 'uuid';

function Card(props) {
    const cardTs = timestamp();
    const descTs = timestamp();
    const checkboxTs = timestamp();
    var completed = false;

    return (<Draggable key={timestamp()} draggableId={"" + props.day + "-" + props.ind} index={props.ind}>
        {(provided) => (
            <li id={cardTs} className="card" onMouseOut={saveDesc} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} {...provided.draggableProps.style}>
                <div className="card-flex">
                    <div className="checkbox-area">
                        <button className="checkbox-button" id={checkboxTs} onClick={toggleCompletion}>
                            
                        </button>
                    </div>
                    <div className="card-desc" id={descTs} onClick={editDesc}>
                        {props.val}
                    </div>
                </div>
            </li>
        )}
    </Draggable>);

    function editDesc () {
        document.getElementById(cardTs).setAttribute("contentEditable", "true");
        console.log("Edit");
    }

    function saveDesc () {
        document.getElementById(cardTs).setAttribute("contentEditable", "false");
        props.editCardDesc(props.ind, document.getElementById(descTs).innerText);
        console.log("Save");
    }

    function toggleCompletion () {
        if (completed){
            document.getElementById(checkboxTs).classList.remove("checkbox-button-done");
        } else {
            document.getElementById(checkboxTs).classList.add("checkbox-button-done");
        }

        completed = !completed;
    }
}

export default Card;
