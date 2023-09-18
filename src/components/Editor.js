import React from "react"
import deleteIcon from "../images/editor-delete.png"

export default function Editor(props){
    return(
        <div className={`editor ${props.darkMode?"dark":""}`} onClick={()=>props.onClickProj(props.projectTitle)}>
            <button className="addTaskButton" onClick={props.onClickAdd}>+ Add Task</button>
            <div className = "tasks">
             {props.tasksElements}
            </div>
        </div>
    )
}

/*<div className="tasks">
                <div className="tasks-item">
                    <div className="left-panel">
                        <button className="task-status"></button>
                        <div className="task-title">Writing Code</div>
                    </div>
                    <div className="right-panel">
                        <div className="task-date">19 June</div>
                        <img className="task-delete" src={deleteIcon}></img>
                    </div>
                </div>
            </div>*/ 