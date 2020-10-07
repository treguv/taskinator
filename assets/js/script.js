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

//Add event listener to button

var createTaskHandler = function() {
  event.preventDefault();
  var listItemEl = document.createElement("li");
  listItemEl.className="task-item";
  //Make div container
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput= document.querySelector("select[name='task-type']").value;
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
  listItemEl.appendChild(taskInfoEl);
  tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit",  createTaskHandler);