const taskTitleInput = document.querySelector('#task-title-input');
const taskDateInput = document.querySelector('#task-date-input');
const taskDescriptionInput = document.querySelector('#task-description-input');
const addTaskBtn = document.querySelector(".btn-success");
const cancelTaskBtn = document.querySelector("#cancel-btn");
const addTaskInputBtn = document.querySelector("#add-task-btn")


// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

function GetTaskInLocalStorage () {

    /* First parse the local storage so we can use the information */
    let storedTasks = JSON.parse(localStorage.getItem('tasks'));

    /*Checking if there is anything, and if not have it as an empty array*/
    if (!storedTasks) {
        storedTasks = []
    }
    return storedTasks;
};



function saveTaskInLocalStorage (storedTasks) {
    /* Stringify the information so it stores into localStorage */
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}



// Todo: create a function to generate a unique task id
function generateTaskId() {
    let generateTaskId = crypto.randomUUID();
    console.log(generateTaskId);
    return generateTaskId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

    /*This is to create elements with stored values from input*/
    const taskCard = document.createElement('div');
        taskCard.addClass('card task-card')
      // need to create values  taskCard.setAttribute('id', 'blank');
    const cardheader = document.createElement('div');
        cardheader.addClass('card-header');
      // need to create values cardheader.textContent = 'blank'
    const cardMain = document.createElement('div');
        cardMain.addClass('card-p');
    const taskDescription = document.createElement('p');
      // need to create values  taskDescription.textContent = 'blank';
    const taskDate = document.createElement('p');
        taskDate.addClass('card-p')

    // need to somehow figure out the due date thing.
    // maybe button function? delete button, submit, back?
    //need to append these so its visible on page...
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
 // maybe I should of start with this one to get more information? Like inputs...
 event.preventDefault();
 //Storing data into variables.
 const taskTitle = taskTitleInput.value;
 const taskDescription = taskDescriptionInput.value;
 const taskDueDate = taskDateInput.value;

 const genTask = {
    id: generateTaskId(),
    Title: taskTitle,
    Description: taskDescription,
    DueDate: taskDueDate,
    status: 'To-Do'
 }

 const storedTasks = GetTaskInLocalStorage();
 storedTasks.push(genTask);

 saveTaskInLocalStorage(storedTasks);

 taskTitle.value = '';
 taskDescription.value = '';
 taskDueDate.value = '';

 return;

 // Not getting any input into the storage...
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

addTaskBtn.addEventListener('click', function() {
    const modal = document.querySelector('#official-modal')
    const overlay = document.querySelector('#overlay-div');
    modal.setAttribute('style', 'visibility: visible');
    overlay.setAttribute('style', 'visibility: visible');
  })


  addTaskInputBtn.addEventListener('click', handleAddTask)



