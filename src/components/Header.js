import React from "react"
import img from '../images/to-do-list-icon.png';

export default function Header(props){
    return(
        <div className={`header ${props.darkMode?"dark":""}`}>
            <div className="headerLeft">
            <a href="https://github.com/anuragrik"><img src = {img} className="to-do-list-icon"></img></a>
            <h2>Todo List</h2>
            </div>
            <div 
                className="toggler" 
            >
                <p className="toggler--light">Light</p>
                <div 
                    className="toggler--slider"
                    onClick={props.toggleDarkMode}
                >
                    <div className="toggler--slider--circle"></div>
                </div>
                <p className="toggler--dark">Dark</p>
            </div>
        </div>
    )
}