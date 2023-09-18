import React from "react"

export default function ProjectAddTab(props){
    return (
            <div className={`addProjectTab ${props.darkMode?"dark":""}`}>
                <input id="projectTitle" placeholder="Project Title"></input>
                <div className="projectButtons">
                    <button onClick={props.addNewProject}>Add</button>
                    <button onClick={props.onCancel}>Cancel</button>
                </div>
            </div>
        )
}