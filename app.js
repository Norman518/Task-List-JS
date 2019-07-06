//Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEeventListers();

function loadEeventListers() {
  form.addEventListener("submit", addTask);
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement("a");
    //Add class
    link.className = "delete-item secondary conent";
    //Add icon html
    link, (innerHTML = '<i class="fa fa-remove></ia>');
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Clear input
    taskInput.value = "";
    e.preventDefaultA();
  }
}
