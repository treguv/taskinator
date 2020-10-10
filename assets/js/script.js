var buttonE1 = document.querySelector("#save-task");
/*
An event is when something happens or is interacted with
eventListener is somethign that waits for that evert
event handler is somethign that deals with the action
In this case we are adding event listener to button, that listens for the click, and then runs the function
*/

//Selects button and assigns to var
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");
//Counter
var taskIdCounter = 0;

//Create an array to house the tasks
var tasks = []

var taskFormHandler = function() {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput= document.querySelector("select[name='task-type']").value;
  //Check if value input
  if(!taskNameInput || !taskTypeInput){
    alert("You need to fill out the task form");
    return false;
  }
  //If the form is an edit it will have data-task-id
  var isEdit = formEl.hasAttribute("data-task-id");
  //if is edit we call edit task method else call create task
  if(isEdit){
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
     //Put into obj
    var taskDataObj = {
    name:taskNameInput,
    type: taskTypeInput,
    status: "to do"
    };
    formEl.reset();
    //Send in as argument
    createTaskEl(taskDataObj); 
  }
}
function createTaskEl(taskDataObj){
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.setAttribute("draggable", "true");
  listItemEl.className = "task-item";
  //Update the task id
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  listItemEl.appendChild(taskInfoEl);
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);
  saveTasks();
  taskIdCounter++;
}
//Create the action buttons forthe task
function createTaskActions(taskId) {
  var actionContainerEl = document.createElement("div");//Div to contain everything
  actionContainerEl.className = "task-actions";
  //create edit button and append
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";//Set text inside
  editButtonEl.className = "btn edit-btn" //You can add multiple classes
  editButtonEl.setAttribute("data-task-id", taskId)

  actionContainerEl.appendChild(editButtonEl);

  //create delete button and append
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";//Set text inside
  deleteButtonEl.className = "btn delete-btn" //You can add multiple classes
  deleteButtonEl.setAttribute("data-task-id", taskId)
  
  actionContainerEl.appendChild(deleteButtonEl);
  
  //Create dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name","status-change");
  statusSelectEl.setAttribute("data-task-id",taskId);
  //Add the options to the dropdown
  var statusChoices = ["To Do", "In Progress", "Completed"];
  for(var i = 0; i < statusChoices.length; i++){
    //Create options element
    var selectOptionEl = document.createElement("option");
    selectOptionEl.textContent = statusChoices[i];
    selectOptionEl.setAttribute("value",statusChoices[i]);

    //append
    statusSelectEl.appendChild(selectOptionEl);
  }
  actionContainerEl.appendChild(statusSelectEl);
  //Pass back complete div
  return actionContainerEl;
}
//Handles the delet function
function taskButtonHandler(event){
  //console.log(event.target);
  //check to see if the delete button was clicked
  if(event.target.matches(".delete-btn")){//Check to see if the clicked item matches delete button id
    // console.log("You clicked the delete button!")
    //if you got here you know youre in the delete button
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
  //Edit button
  if(event.target.matches(".edit-btn")){
    // console.log("You clicked the edit button");
    var taskId = event.target.getAttribute("data-task-id");
    editTask(taskId);
  }
}
//Edit the task
function editTask(taskId){
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // console.log(taskSelected);
  //select elements from inside the li
  //We can use the querySelector on any object
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  // console.log(taskName);
  var taskType = taskSelected.querySelector("span.task-type").textContent;//Looks span inside element with the class task-type
  // console.log(taskType);

  //Now we can target that form and replace the things inside it with our element
  document.querySelector("input[name='task-name']").value= taskName;
  document.querySelector("select[name='task-type']").value= taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  //This gives the form the id of the current task so it doesnt get lost
  formEl.setAttribute("data-task-id", taskId);
}
//finalises the editing of the task
function completeEditTask(taskName, taskType, taskId){
  // console.log(taskName, taskType,taskId);
  //Find the corresponsing task.
  var taskSelected = document.querySelector(".task-item[data-task-id ='"+taskId+"']");
  //Set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  for (var i= 0; i < tasks.length; i++){//Run through all tasks until you get to the task yoou are editing
    if(tasks[i].id === parseInt(taskId)){
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }
  //Save tasks
  saveTasks();
  //Clean up work
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = 'Add Task';
}
//Delete the task
function deleteTask(taskId){
  //select element with class .task-item where data-task-id = taskId
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // console.log(taskSelected);
  taskSelected.remove();
  //make second array to house all but removed item
  var updatedTaskArr = [];
  for(var i = 0; i < tasks.length; i++) { 
    if(tasks[i].id !== parseInt(taskId)){
      updatedTaskArr.push(tasks[i]);
    }
  }
  //reassign the updated array to original
  tasks = updatedTaskArr;
  saveTasks();
}
//Change to different column
function taskStatusChangeHandler(event){
  // console.log(event.target);
  // console.log(event.target.getAttribute("data-task-id"));

  //get task item id
  var taskId = event.target.getAttribute("data-task-id");
  //get currently selected option val and convert to lowercase
  var statusValue = event.target.value.toLowerCase();
  //find the parent item based on element id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  //We can just append the element to the other columns bc we found it in taskSelected
  if(statusValue === "to do"){
    tasksToDoEl.appendChild(taskSelected);
  }else if(statusValue === "in progress"){
    tasksInProgressEl.appendChild(taskSelected);
  }else if(statusValue === "completed"){
    tasksCompletedEl.appendChild(taskSelected);
  }
  //update the task in the array
  for (var i = 0; i < tasks.length; i++){
    if(tasks[i].id === parseInt(taskId)){
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
}
//Handle the dragstart event on tasks
function dragTaskHandler(event){
  var taskId = event.target.getAttribute("data-task-id");
  event.dataTransfer.setData("text/plain", taskId);
  var getId = event.dataTransfer.getData("text/plain");
  //console.log("getId:", getId, typeof getId);
}
//Handle the drop zones
function dropZoneDragHandler(event){
  var taskListEl  = event.target.closest(".task-list"); // Assign this to the closest task-list parent. If it isnt found its null
  if(taskListEl){
    event.preventDefault(); //Stops the default behavior
    taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");//Update css based on which is being hovered over
  }
}
//Handle the task being dropped
function dropTaskHandler(event){
  var id = event.dataTransfer.getData("text/plain");
  var draggableElement = document.querySelector("[data-task-id='" + id + "']");
  dropZoneEl = event.target.closest(".task-list");
  var statusType = dropZoneEl.id;
  var statusSelectEl = draggableElement.querySelector("select[name='status-change'");
  //CHange the selected status based on what we dropped it on
  if (statusType === "tasks-to-do"){
    statusSelectEl.selectedIndex = 0;
  }else if (statusType === "tasks-in-progress"){
    statusSelectEl.selectedIndex = 1;
  }else if (statusType === "tasks-completed"){
    statusSelectEl.selectedIndex = 2;
  }
  //Remove the extra style
  dropZoneEl.removeAttribute("style");
  //Move the eleemnt to the right column
  dropZoneEl.appendChild(draggableElement);
}
//Dragged off
function dragLeaveHandler(event){
  var taskListEl = event.target.closest(".task-list"); 
  if (taskListEl) { //If 
    taskListEl.removeAttribute("style");
  }
}

//Saving to local storage
function saveTasks(){
  //Save the array to the local storage
  //localStorage.setItem("tasks",tasks) This wont work becasue local storage can onlystore strings
  localStorage.setItem("tasks",JSON.stringify(tasks)); // Turns obj into json string
}
//loadTasks
function loadTasks(){
  //Get task items from local storage
  tasks = localStorage.getItem("tasks");
  if(tasks === null){
    tasks = [];
    return false;
  }
  //convert from stringified form to obj array
  tasks = JSON.parse(tasks);
  //itterate through array to create tasks
  for(var i = 0; i < tasks.length; i++){
    tasks[i].id = taskIdCounter;
    //Make the list element
    listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", tasks[i].id);
    listItemEl.setAttribute("draggable", "true");
    //Make div to house stuff
    taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
    //append the div into li
    listItemEl.appendChild(taskInfoEl);
    //make task options
    taskActionsEl = createTaskActions(tasks[i].id);
    //append task options to li
    listItemEl.appendChild(taskActionsEl);
    //(listItemEl);
    //Check the tasks status
    //add back to do
    if(tasks[i].status === "to do"){
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
      tasksToDoEl.appendChild(listItemEl);
    }
    //add back in progress
    if(tasks[i].status === "in progress"){
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
      tasksInProgressEl.appendChild(listItemEl);
    }
    //add back completed
    if(tasks[i].status === "completed"){
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
      tasksCompletedEl.appendChild(listItemEl);
    }
    taskIdCounter++;
  }

}
loadTasks();
//Add task listener
formEl.addEventListener("submit",  taskFormHandler);
//page event listener
pageContentEl.addEventListener("click",taskButtonHandler);//passes in element by default?
//Listener for change
pageContentEl.addEventListener("change", taskStatusChangeHandler);
//Listener for dragging
pageContentEl.addEventListener("dragstart",dragTaskHandler);
//listener for the drop zones
pageContentEl.addEventListener("dragover", dropZoneDragHandler);// No parenthesis pass as callback
//Listen for the item to be dropped
pageContentEl.addEventListener("drop", dropTaskHandler);
//Listen when the item is dragged off
pageContentEl.addEventListener("dragleave", dragLeaveHandler);