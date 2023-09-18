import React from "react"
import todayIcon from "../images/sidebar-today.png"
import tomorrowIcon from "../images/sidebar-tomorrow.png"
import weekIcon from "../images/sidebar-week.png"
import projectIcon from "../images/sidebar-project.png"
import ProjectAddTab from "./ProjectAddTab"

export default function Sidebar(props){
  
    return (
        <div className={`sidebar ${props.darkMode?"dark":""}`}>
            <button onClick={props.onHome} className="workspace button" id="homeButton" >Home</button>
            <button onClick={props.onToday} className="sidebar-items" id="todayButton">
                <img src={todayIcon}/>
                <div>Today</div>
            </button>
            <button onClick={props.onTomm} className="sidebar-items" id="tommButton">
                <img src={tomorrowIcon}/>
                <div>Tomorrow</div>
            </button>
            <button onClick={props.onLater} className="sidebar-items" id="laterButton">
                <img src={weekIcon}/>
                <div>Later</div>
            </button>
            <div className="workspace">Workspace</div>
            <button id="addProj" onClick={props.addProject}>+ Add Project</button>
            {props.addProjectStatus && <ProjectAddTab onCancel={props.cancelProject} addNewProject={props.addNewProject} darkMode={props.darkMode}/>}
            {props.projecElements}
        </div>
    )
}

/*

*/