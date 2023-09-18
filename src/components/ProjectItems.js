import React from "react"
import projectIcon from "../images/sidebar-project.png"

export default function ProjectItem(props){

    const [projTitle, setProjTitle] = React.useState(props.projectTitle);
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        setProjTitle(props.projectTitle);
    }, [props.projectTitle]);

    const handleInputChange = (e) => {
        setProjTitle(e.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
        props.projTitleChange(projTitle, props.projectKey);
    };

    return(
        <button className={`sidebar-items project ${props.darkMode?"dark":""}`} onClick={()=>props.onClickProj(props.projectTitle)}>
                <img src={projectIcon}/>
                {isEditing ? (<input value={projTitle} onChange={handleInputChange} onBlur={handleInputBlur} className="projTitleInput" autoFocus/>):
                (<input
                    className="projTitleInput"
                    onClick={() => setIsEditing(true)}
                    value={projTitle}
                >
                </input>)}
                <button className="deleteProject" onClick={()=>props.deleteProject(props.projectKey)}>X</button>
        </button>
    )
}