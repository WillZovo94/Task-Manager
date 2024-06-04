/* Saved variables with querySelector locators */
const taskTitleInput = document.querySelector('#task-title-input');
const taskDateInput = document.querySelector('#task-date-input');
const taskDescriptionInput = document.querySelector('#task-description-input');
const addTaskBtn = document.querySelector(".btn-success");
const cancelTaskBtn = document.querySelector("#cancel-btn");
const addTaskInputBtn = document.querySelector("#add-task-btn")
const deleteButtonCard = document.querySelector('.card-delete-btn')


// Retrieve tasks and nextId from localStorage
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
  /* crytpo.randomUUID() is used to generate a random ID */
    let generateTaskId = crypto.randomUUID();
    console.log(generateTaskId);
    return generateTaskId;
}

// Todo: create a function to create a task card
function createTaskCard(storedTasks) {

  /* get information from local storage */
  GetTaskInLocalStorage();

  /* get information and create new elements with classes, attributes, and text if needed */
  const card = $('<div>').addClass('card my-2 draggable').attr('data-id', storedTasks.id);
  const cardBody = $('<div>').addClass('card-body');
  const cardHeader = $('<h2>').addClass('card-title-task').text(storedTasks.Title);
  const cardDescription = $('<p>').addClass('card-p card-desc').text(storedTasks.Description);
  const cardDueDate = $('<p>').addClass('card-p card-due-date').text(storedTasks.DueDate);
  const cardDeleteButton = $('<button>').addClass('card-delete-btn btn').text('Delete').attr('data-task-id', storedTasks.id);

  /* checking if they're not equal to done */
  if (storedTasks.taskDueDate && storedTasks.status !== 'done'); {
    const current = dayjs();
    const taskDueDate = dayjs(storedTasks.DueDate);

    /* adding classes based on the time so they have visible differences */
    if (current.isSame(taskDueDate, 'day')) {
      cardBody.addClass('due-today')
    } else if (current.isAfter(taskDueDate, 'day')) {
      cardBody.addClass('past-date')
    }
  }


 /* creating cards by appending */
  cardBody.append(cardHeader, cardDescription, cardDueDate, cardDeleteButton);
  card.append(cardBody);


  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(storedTasks) {
  /* making variables that are selecting the sections */
  const todoCards = $('#todo-cards').empty();
  const inProgressCards = $('#in-progress-cards').empty();
  const finishedCards = $('#done-cards').empty();
  
  /* for loop so we can go through storedTasks and check their status */
  if (storedTasks && storedTasks.length > 0) {
    for (let i = 0; i < storedTasks.length; i++) {
      const card = createTaskCard(storedTasks[i]);
  
      /* so it will render based on the status */
      if (storedTasks[i].status === 'to-do') {
        todoCards.append(card);
      } else if (storedTasks[i].status === 'in-progress') {
        inProgressCards.append(card);
      } else if (storedTasks[i].status === 'done') {
        finishedCards.append(card);
      }
  
    }
  }

  
  
  $( ".draggable" ).draggable({ 
    zIndex: 100,
    revert: 'invalid'
  });
};

// Todo: create a function to handle adding a new task
function handleAddTask(event){
 event.preventDefault();
 //Storing data into variables.
 const taskTitle = taskTitleInput.value;
 const taskDescription = taskDescriptionInput.value;
 const taskDueDate = taskDateInput.value;

 /* creating a object with data and inputs */
 const genTask = {
    id: generateTaskId(),
    Title: taskTitle,
    Description: taskDescription,
    DueDate: taskDueDate,
    status: 'to-do'
 }

 const storedTasks = GetTaskInLocalStorage();
 /* pushes the info into the newly generated object */
 storedTasks.push(genTask);

 saveTaskInLocalStorage(storedTasks);

 /* hiding the mdoal after the info is stored */
 const modal = document.querySelector('#official-modal')
 const overlay = document.querySelector('#overlay-div');
 modal.setAttribute('style', 'visibility: hidden');
 overlay.setAttribute('style', 'visibility: hidden');

 /* resetting the values */
 taskTitleInput.value = '';
 taskDescriptionInput.value = '';
 taskDateInput.value = '';

 renderTaskList(storedTasks);

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  event.preventDefault();
  /* finding stuff with attr of data-task-id */
  const thisSelector = $(this).attr('data-task-id');
  const getStorage = GetTaskInLocalStorage();

  /* a quick forEach with arrow function running into an if statement to see if storedTask Id is similar to the selector with that attribute then splicing*/
  getStorage.forEach((storedTasks) => {
    if (storedTasks.id === thisSelector) {
      getStorage.splice(getStorage.indexOf(storedTasks), 1)
    }
  })

  saveTaskInLocalStorage(getStorage);
  
  renderTaskList(getStorage);
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  /* setting variables with storage, ui-draggables, and target events */
  const storedTasks = GetTaskInLocalStorage();
  const taskId = ui.draggable[0].dataset.id
  const newStatus = event.target.id;
  
  /* a for loop to check if the storedTasks id is equal to the taskId above to see if ui-draggables */
  if (storedTasks && storedTasks.length > 0) {
    for (let i = 0; i < storedTasks.length; i++) {
      if (storedTasks[i].id === taskId) {
        storedTasks[i].status = newStatus;
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

      /* add event listener to the addTaskBtn which helps the the modal to be visible */
      addTaskBtn.addEventListener('click', function() {
        const modal = document.querySelector('#official-modal')
        const overlay = document.querySelector('#overlay-div');
        modal.setAttribute('style', 'visibility: visible');
        overlay.setAttribute('style', 'visibility: visible');
      })

        /* draggable with z-index and revert so it goes back to original spot */
        $( ".draggable" ).draggable({ 
          zIndex: 100,
          revert: 'invalid'
        });

        /* droppable that selects lane class with tolerance as well to help with its placement */
        $('.lane').droppable({
          accept: ".draggable",
          tolerance: 'intersect',
          drop: handleDrop
          });
        });  
        
        /* on click event */
        const test = $('.lane');
        test.on('click', '.btn', handleDeleteTask)
      
      /* addEventListener for handle adding tasks */
      addTaskInputBtn.addEventListener('click', handleAddTask)
      
      renderTaskList(storedTasks);
      
      





