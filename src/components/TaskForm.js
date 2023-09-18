import React from "react"

export default function TaskForm(props){
    const projectElements = (props.projectList).map((obj)=>{
        return (
            <option value={obj.title}>{obj.title}</option>
        )
    })
    return(
        <form className="form" ref={props.popRef} method="get" action="/action_page.php">
            <div className="head">
                <h3>Add New Task</h3>
            </div>
            <div className="item">
                <input type="text" id="title" name="title" placeholder="Task Title" required/> 
            </div>
            <div className="item date" id="itemDate">
                <input type="date" id="date" name="date" placeholder="Due Date" required/>
            </div>
            <div className="item-status category">
                <select name="Project" id="projectCategory" name="projectCategory">
                   <option value="">Select Project</option>
                   {projectElements}
                </select>
            </div>
            <div className="item-status due">
                <select name="Due On" id="status" name="status">
                   <option value="select" onClick={props.offOnClick}>Due</option>
                    <option value="today" onClick={props.offOnClick}>Today</option>
                    <option value="tomorrow" onClick={props.offOnClick}>Tomorrow</option>
                    <option  onClick={props.onClick} className="pick-date" value="later">Pick Date</option>
                </select>
            </div>
            <div className="item submit">
                <button onClick={props.handleSubmit}>Add</button>
            </div>
        </form>
    )
}