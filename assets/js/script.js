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
var formEl = document.querySelector("#task-form");
//Counter
var taskIdCounter = 0;

//Add event listener to button

var taskFormHandler = function() {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput= document.querySelector("select[name='task-type']").value;
  //Check if value input
  if(!taskNameInput || !taskTypeInput){
    alert("You need to fill out the task form");
    return false;
  }
  //Put into obj
  var taskDataObj = {
    name:taskNameInput,
    type: taskTypeInput
  };
  formEl.reset();
  //Send in as argument
  createTaskEl(taskDataObj);

}
function createTaskEl(taskDataObj){
  // create list item
  var listItemEl = document.createElement("li");
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

formEl.addEventListener("submit",  taskFormHandler);