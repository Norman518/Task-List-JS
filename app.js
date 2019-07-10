'use strict'

//Define UI vars 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Get Tasks from Local Storage
const getTasks=()=> { 
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
 tasks.forEach(
        task=> {
                //create li element
            const li = document.createElement('li');
            //Add class
            li.className='collection-item';
            //create text node and append to li
            li.appendChild(document.createTextNode(task));
            //create new link element
            const link = document.createElement('a');
            //Add class
            link.className = 'delete-item secondary-content';
            //Add icon html
            link.innerHTML = '<i class="fa fa-times"></i>';
            //append the link to the li
            li.appendChild(link);
            //Append li to ul
            taskList.appendChild(li);
        })
}
//Add Task
const addTask =(e)=> { 
    if(taskInput.value=== '') {
        alert('Add a task');
        return;
    }

    //create li element
    const li = document.createElement('li');
    //Add class
    li.className='collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-times"></i>';
    //append the link to the li
    li.appendChild(link);

    //store in local storage
    storeTaskinLocalStorage(taskInput.value);

    //Append li to ul
    taskList.appendChild(li);

    //clear input
    taskInput.value='';

    e.preventDefault();
}


//store task in local storage
const storeTaskinLocalStorage =(task)=> { 
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const  removeTask=(e)=> {  
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
const removeTaskFromLocalStorage=(taskItem)=> { 
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(
        (task, index) => {
            if(taskItem.textContent===task) {
                tasks.splice(index, 1);
            }
        }
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const clearTasks=()=> {  
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}

//Filter Tasks
const filterTasks=()=> {  
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        task=>{
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!=-1){
                task.style.display='block';
            }
            else {
                task.style.display='none';
            }
        }
    );
}   

//Load all event listeners
( () => {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add tasks event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //clear tasks event
    clearButton.addEventListener('click', clearTasks);
    //filter tasks event
    filter.addEventListener('keyup', filterTasks);
})();



