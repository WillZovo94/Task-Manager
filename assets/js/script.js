const taskTitleInput = document.querySelector('#task-title-input');
const taskDateInput = document.querySelector('#task-date-input');
const taskDescriptionInput = document.querySelector('#task-description-input');
const addTaskBtn = document.querySelector(".btn-success");
const cancelTaskBtn = document.querySelector("#cancel-btn");
const addTaskInputBtn = document.querySelector("#add-task-btn")


// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
let storedTasks = JSON.parse(localStorage.getItem("tasks"));
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
function createTaskCard(storedTasks) {
  GetTaskInLocalStorage();

  const card = $('<div>').addClass('card my-2 draggable').attr('task-id', storedTasks.id);
  const cardBody = $('<div>').addClass('card-body');
  const cardHeader = $('<h2>').addClass('card-title').text(storedTasks.Title);
  const cardDescription = $('<p>').addClass('card-p card-desc').text(storedTasks.Description);
  const cardDueDate = $('<p>').addClass('card-p card-due-date').text(storedTasks.DueDate);

  // need to make delete button

  if (storedTasks.taskDueDate && storedTasks.status !== 'done'); {
    const current = dayjs();
    const taskDueDate = dayjs(storedTasks.DueDate);

    if (current.isSame(taskDueDate, 'day')) {
      cardBody.addClass('due-today')
    } else if (current.isAfter(taskDueDate, 'day')) {
      cardBody.addClass('past-date')
     // need to add delete btn cardDeleteButton.addClass('card-delete-btn');
    }
  }

  cardBody.append(cardHeader, cardDescription, cardDueDate);
  card.append(cardBody);


  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(storedTasks) {
  const todoCards = $('#todo-cards').empty();
  const inProgressCards = $('#in-progress-cards').empty();
  const finishedCards = $('#done-cards').empty();
  
  if (storedTasks && storedTasks.length > 0) {
    for (let i = 0; i < storedTasks.length; i++) {
      const card = createTaskCard(storedTasks[i]);
  
      if (storedTasks[i].status === 'to-do') {
        todoCards.append(card);
      } else if (storedTasks[i].status === 'in-progress') {
        inProgressCards.append(card);
      } else if (storedTasks[i].status === 'finished') {
        finishedCards.append(card);
      }
  
    }
  }


  
  };

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
    status: 'to-do'
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
  const storedTasks = GetTaskInLocalStorage();
  const taskId = ui.draggable[0].dataset.id
  const newStatus = event.target.id;
  
  if (storedTasks && storedTasks.length > 0) {
    for (let i = 0; i < storedTasks.length; i++) {
      if (storedTasks.id === taskId) {
        storedTasks.status = newStatus;
      }
    }
  }

  localStorage.setItem('tasks', JSON.stringify(storedTasks));
  renderTaskList(storedTasks);

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  /* A date picker from JqueryUI to help input the due date */

    $( function() {
        $( "#task-date-input" ).datepicker();
      } );

      addTaskBtn.addEventListener('click', function() {
        const modal = document.querySelector('#official-modal')
        const overlay = document.querySelector('#overlay-div');
        modal.setAttribute('style', 'visibility: visible');
        overlay.setAttribute('style', 'visibility: visible');
      })

        $( ".draggable" ).draggable({ 
          zIndex: 100,
        });

        $('.lane').droppable({
          accept: ".draggable",
          drop: handleDrop
          });
        });  

        
      

      
      addTaskInputBtn.addEventListener('click', handleAddTask)
      
      renderTaskList(storedTasks);
      





