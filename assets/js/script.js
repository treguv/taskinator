var buttonE1 = document.querySelector("#save-task");
console.log(buttonE1);

/*
An event is when something happens or is interacted with
eventListener is somethign that waits for that evert
event handler is somethign that deals with the action
In this case we are adding event listener to button, that listens for the click, and then runs the function
*/

//Selects button and assigns to var
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
//Add event listener to button

var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
  }

buttonE1.addEventListener("click",  createTaskHandler);