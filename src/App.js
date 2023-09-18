import React from "react"
import {nanoid} from 'nanoid'
import Sidebar from "./components/Sidebar.js"
import Header from "./components/Header.js"
import Editor from "./components/Editor.js"
import TaskForm from "./components/TaskForm.js"
import TaskItems from "./components/TaskItems.js"
import ProjectItems from "./components/ProjectItems.js"


export default function App(){

  //Start of Controlling Form action - opening and closing

  const [darkMode, setDarkMode] = React.useState(
    JSON.parse(localStorage.getItem("mode")) ||false)
    
    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }

    React.useEffect(
      ()=>{
        localStorage.setItem("mode",JSON.stringify(darkMode))
      }, [darkMode]
    )
  

  const [formState, setFormState] = React.useState(false);
  const popupRef = React.useRef(null);
  const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          setFormState(false);
        }
      };
  React.useEffect(() => {
        if (formState) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [formState]);
  function handleAdd(){
        setFormState(!formState);
    }
  
  //Start of Controlling setting dates for task on form

  const [stateDate, setStateDate] = React.useState(false);

  function handleStateDate() {
    setStateDate(!stateDate);
    document.getElementById("itemDate").style.display=  stateDate ? 'none' : 'block'
  }

  function defaultStateDate(){
    setStateDate(false);
    document.getElementById("itemDate").style.display=  'none';
  }

  //Adding and reading input from form

  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("tasks")) || []);

  React.useEffect(
    ()=>{
      localStorage.setItem("tasks",JSON.stringify(tasks))
    }, [tasks]
  )


  function handleSubmit(){
    
    if(document.getElementById("title").value!==""){
      let newTask = {
        key: nanoid(),
        title: document.getElementById("title").value,
        toDoDate: document.getElementById("status").value,
        date:"",
        status:false,
        category: document.getElementById("projectCategory").value
    }
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    if(newTask['toDoDate']==="later"){
      let dateVal = new Date(document.getElementById("date").value);
      let dateString = dateVal.getDate()+" "+ monthNames[dateVal.getMonth()];
      newTask = {...newTask,
      date: dateString}
    }else if(newTask['toDoDate']==="tomorrow"){
      let dateVal = new Date();
      let dateString = dateVal.getDate()+1+" "+ monthNames[dateVal.getMonth()];
      newTask = {...newTask,
      date: dateString}
    }else if(newTask['toDoDate']==="today" || newTask['toDoDate']==="select" ){
      let dateVal = new Date();
      let dateString = dateVal.getDate()+" "+ monthNames[dateVal.getMonth()];
      newTask = {...newTask,
      date: dateString,}
    }
    setTasks(prevTasks=>[...prevTasks, newTask]);
    setFormState(false);
    }
  }

  //Mapping each input to DOM (default)

  const tasksElements = tasks.map((taskItem)=>{
    return (
      <TaskItems 
      id={taskItem.key}
      title={taskItem.title}
      date={taskItem.date}
      deleteTask = {deleteTasks}
      switchStrike={switchStrike}
      status={taskItem.status}
      handleTitleChange = {handleTitleChange}
      />
)})

// Setting up Today, Tomorrow, and Later Tabs

const [tabSelect, setTabSelect] = React.useState({
  home: true,
  today: false,
  tomorrow: false,
  later: false
})

const [currentProjectItem, setCurrentProjectItem] = React.useState("")

  function projectFilter(projTitle){
    console.log("Updating")
    setCurrentProjectItem(projTitle);
    setTabSelect({home: false,
      today: false,
      tomorrow: false,
      later: false})
  }

function handleHome(){
  setTabSelect({home: true,
    today: false,
    tomorrow: false,
    later: false})
    setCurrentProjectItem("")
}

function handleToday(){
  console.log("Step 1")
  setTabSelect((prevTabSelect)=>{
    console.log("Step 1.1")
    return {
      ...prevTabSelect,
      home: false,
      today: true,
      tomorrow: false,
      later: false
      
    }
  })
  setCurrentProjectItem("")
}

function handleTomm(){
  setTabSelect({home: false,
    today: false,
    tomorrow: true,
    later: false})
 setCurrentProjectItem("")
}

function handleLater(){
  setTabSelect({home: false,
    today: false,
    tomorrow: false,
    later: true})
  setCurrentProjectItem("")
}

const[actualTaskElements, setActualTaskElements] = React.useState(tasksElements);

/*function styleSidebar(homeBg, homeRad, todayBg, todayRad, tommBg, tommRad, laterBg, laterRad){
      document.getElementById("homeButton").style.backgroundColor = homeBg;
      document.getElementById("homeButton").style.borderRadius = homeRad;
      document.getElementById("todayButton").style.backgroundColor = todayBg;
      document.getElementById("todayButton").style.borderRadius = todayRad;
      document.getElementById("tommButton").style.backgroundColor = tommBg;
      document.getElementById("tommButton").style.borderRadius = tommRad;
      document.getElementById("laterButton").style.backgroundColor = laterBg;
      document.getElementById("laterButton").style.borderRadius = laterRad;
}*/

React.useEffect(() => {
  let filteredTasks = [];

  console.log(currentProjectItem)

  if (tasks.length > 0) {
    if (tabSelect.home) {
      /*styleSidebar("#FDCACA", "8px", "", "","","","","",)*/
      filteredTasks = tasks;
    } else if (tabSelect.today) {
      /*styleSidebar("", "", "#FDCACA", "8px","","","","",)*/
      filteredTasks = tasks.filter(
        (item) => item.toDoDate === "today" || item.toDoDate === "select"
      );
    } else if (tabSelect.tomorrow) {
      /*styleSidebar("", "", "", "","#FDCACA","8px","","",)
      filteredTasks = tasks.filter((item) => item.toDoDate === "tomorrow");*/
    } else if (tabSelect.later) {
      /*styleSidebar("", "", "", "","","","#FDCACA","8px",)*/
      filteredTasks = tasks.filter((item) => item.toDoDate === "later");
    } else if(currentProjectItem!==""){
      console.log("Fuckkkks")
      filteredTasks = tasks.filter((item) => item.category === currentProjectItem);
    }
  }

  const filteredTaskElements = filteredTasks.map((taskItem) => {
    return (
      <TaskItems 
      key={taskItem.key} 
      id={taskItem.key}
      title={taskItem.title}
      date={taskItem.date}
      /*deletingTasks*/ deleteTask = {deleteTasks}
      switchStrike={switchStrike}
      status={taskItem.status}
      handleTitleChange = {handleTitleChange}/>
    );
  });

  setActualTaskElements(filteredTaskElements);
}, [tabSelect, tasks, currentProjectItem]);

//Deleting Tasks

function deleteTasks(taskId){
  setTasks(prevTasks=>prevTasks.filter(task=> task.key!==taskId))
}

//Switching Strike

function switchStrike(taskId) {

  setTasks((prevTasks) => {
    const index = prevTasks.findIndex((obj) => obj.key === taskId);
    if (index !== -1) {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].status = !updatedTasks[index].status;
      return updatedTasks;
    }
    return prevTasks;
  });
}
  //Hnadle Title change
  function handleTitleChange(inpVal, taskId){
    const newTitleValue = inpVal;
    console.log(newTitleValue); 
    setTasks((prevTasks) => {
      const index = prevTasks.findIndex((obj) => obj.key === taskId);
      if (index !== -1) {
        const updatedTasks = [...prevTasks];
        updatedTasks[index].title = newTitleValue;  
        return updatedTasks;
      }
        return prevTasks;
    });
  }

  // Adding projects

  const[projectAdd, setProjectAdd] = React.useState(false)

  const [projects, setProjects] = React.useState(
    JSON.parse(localStorage.getItem("projects")) || [])

  React.useEffect(
    ()=>{
      localStorage.setItem("projects",JSON.stringify(projects))
    }, [projects]
  )

  function addProject(){
    setProjectAdd(true);
  }
  function cancelAddProject(){
    setProjectAdd(false)
  }

  function addNewProject(){
    setProjectAdd(false)
    const newProjItem = {
      title: document.getElementById("projectTitle").value,
      id: nanoid()}
    setProjects((prevProjects)=>[...prevProjects, newProjItem])
  }


  const projectElements = projects.map((item)=>{
    return (
      <ProjectItems projectTitle={item.title}
      deleteProject={deleteProject}
      projectKey={item.id}
      projTitleChange={projTitleChange}
      onClickProj={projectFilter}
      darkMode={darkMode}/>
    )
  })

    function deleteProject(projId){
    setProjects(prevProjs=>prevProjs.filter(projs=> projs.id!==projId))
  }

  function projTitleChange(projTitle, projId) {
    const newProjTitle = projTitle;
    let toUpdateTitle;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === projId) {
        toUpdateTitle = projects[i].title;
      }
    }
  
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.category === toUpdateTitle) {
          return { ...task, category: newProjTitle };
        }
        return task;
      });
    });
  
    setProjects((prevProjs) => {
      const index = prevProjs.findIndex((obj) => obj.id === projId);
      if (index !== -1) {
        const updatedProjects = [...prevProjs];
        updatedProjects[index].title = newProjTitle;
        return updatedProjects;
      }
      return prevProjs;
    });
  }


//The Final Return

    return (
        <>
            <Header 
              darkMode={darkMode} 
              toggleDarkMode={toggleDarkMode}
            />
            <div className="main-box">
                <Sidebar /*handlingSidebarTabs*/
                  darkMode={darkMode}  
                  onHome={handleHome}
                  onToday={handleToday}
                  onTomm={handleTomm}
                  onLater={handleLater}
                  addProject={addProject}
                  cancelProject = {cancelAddProject}
                  addProjectStatus = {projectAdd}
                  addNewProject = {addNewProject}
                  projecElements = {projectElements}
                />
                <Editor /*closingForm*/ onClickAdd={handleAdd} /*renderingAllTasks*/ tasksElements={actualTaskElements} darkMode={darkMode}/>
                {formState && <TaskForm 
                /*closingForm*/ popRef={popupRef}  
                /*settingDates*/ onClick={handleStateDate} offOnClick={defaultStateDate}
                /*handlingSubmit*/handleSubmit={handleSubmit}
                projectList = {projects}
                />}
            </div>
        </>
    )
  }