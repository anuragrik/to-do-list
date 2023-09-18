import React from "react"
import deleteIcon from "../images/editor-delete.png"

export default function TaskItems(props){
    const [inpVal, setInpVal] = React.useState(props.title);
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        setInpVal(props.title);
    }, [props.title]);

    const handleInputChange = (e) => {
        setInpVal(e.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        props.handleTitleChange(inpVal, props.id);
    };

    return (
        <div className="tasks-item" key={props.id}>
          <div className="left-panel">
              <button className={`task-status ${props.status?"done":""}`} onClick={()=>props.switchStrike(props.id)}></button>
              {isEditing ? (
                <input
                    className={`task-title ${props.status ? "strikethrough" : ""}`}
                    value={inpVal}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    autoFocus
                />
                ) : (
                <input value={inpVal}
                    className={`task-title ${props.status ? "strikethrough" : ""}`}
                    onClick={() => setIsEditing(true)}
                >
                </input>
                )}
          </div>
          <div className="right-panel">
              <div className="task-date">{props.date}</div>
              <button id="deleteButton" onClick={()=>props.deleteTask(props.id)}><img className="task-delete" src={deleteIcon}></img></button>
          </div>
      </div>
    )
}