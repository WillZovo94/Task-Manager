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
  GetTaskInLocalStorage();

  const card = $('div').addClass('card my-2').attr('task-id', task.id);
  const cardBody = $('div').addClass('card-body');
  const cardHeader = $('h2').addClass('card-title').text(task.taskTitle);
  const cardDescription = $('p').addClass('card-p card-desc').text(task.taskDescription);
  const cardDueDate = $('p').addClass('card-p card-due-date').text(task.taskDueDate);

  if (task.taskDueDate && task.status !== 'done'); {
    const current = dayjs();
    const taskDueDate = dayjs(task.taskDueDate);
  }

  if (current.isSame(taskDueDate, 'day')) {
    card.addClass('due-today');
  } else if (now.isAfter(taskDueDate)) {
    card.addClass('past-date');
  }

  card.append(cardBody);
  cardBody.append(cardHeader, cardDescription, cardDueDate);

  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(storedTasks) {

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

 const modal = document.querySelector('#official-modal')
 const overlay = document.querySelector('#overlay-div');
 modal.setAttribute('style', 'visibility: hidden');
 overlay.setAttribute('style', 'visibility: hidden');

 taskTitleInput.value = '';
 taskDescriptionInput.value = '';
 taskDateInput.value = '';

 renderTaskList(storedTasks);

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  /* A date picker from JqueryUI to help input the due date */
    $( function() {
        $( "#task-date-input" ).datepicker();
      } );

});

addTaskBtn.addEventListener('click', function() {
    const modal = document.querySelector('#official-modal')
    const overlay = document.querySelector('#overlay-div');
    modal.setAttribute('style', 'visibility: visible');
    overlay.setAttribute('style', 'visibility: visible');
  })


  addTaskInputBtn.addEventListener('click', handleAddTask)



