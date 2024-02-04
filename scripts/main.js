// let tasks = {
//   // tasks object for tracking the properties of task item.
//   todo: [],
//   started: [],
//   completed: [],
// };

// let form = document.getElementById("task-form");
// let todo = document.getElementById("todo");
// let started = document.getElementById("started");
// let completed = document.getElementById("completed");
// let dropText = document.getElementsByClassName("drop-text");

// let id = 1;

// // Listening submit event on form to create new Task
// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   if (form.button.innerText.trim() === "Save") {
//     form.button.innerHTML = `Add <i class="fa-solid fa-circle-plus"></i>`;
//   }

//   document.getElementById("empty-container").style.display = "none";

//   const taskName = form.task.value;
//   const taskDueDate = form.date.value;
//   const taskPriority = form.priority.value;

//   const newTask = document.createElement("div");
//   newTask.className = "task-item";
//   newTask.id = id++;
//   newTask.setAttribute("draggable", true);
//   newTask.addEventListener("dragstart", onDragStart);

//   newTask.innerHTML = `<div class="header">
//                           <p>Due on ${taskDueDate}</p>
//                           <p class="priority" style="color:${applyColor(
//                             taskPriority.trim()
//                           )};">${taskPriority}</p>
//                       </div>
//                       <div>
//                           <p>${taskName}</p>
//                           <div class="buttons">
//                           </div>
//                       </div>`;

//   // Creating edit button for task
//   let editButton = document.createElement("button");
//   editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;

//   editButton.addEventListener("click", editTask);

//   //   Creating Delete button for task
//   let deleteButton = document.createElement("button");
//   deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

//   deleteButton.addEventListener("click", deleteTask);

//   //   Extracting buttons container
//   newTask.querySelector(".buttons").append(editButton, deleteButton);

//   //   Inserting Task element in the task list
//   todo.insertBefore(newTask, dropText[0]);

//   //   function for delete task
//   function deleteTask() {
//     const currentContainerId = newTask.parentNode.id;
//     let index = (tasks[currentContainerId].findIndex = (task) =>
//       task.id === newTask.id);
//     tasks[currentContainerId].splice(index, 1);

//     // After delete updating the local storage.
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     document.getElementById(
//       `${currentContainerId}-count`
//     ).innerText = `${tasks[currentContainerId].length}`;
//     document.getElementById(
//       `${currentContainerId}-high`
//     ).innerText = `${countHigh(tasks[currentContainerId])} of ${
//       tasks[currentContainerId].length
//     }`;

//     tasks.todo.length
//       ? (document.getElementById("empty-container").style.display = "none")
//       : (document.getElementById("empty-container").style.display = "flex");

//     newTask.remove();
//   }

//   //   Creating Task object to store it in local storage.
//   let taskObj = {
//     id: newTask.id,
//     name: taskName,
//     dueDate: taskDueDate,
//     priority: taskPriority,
//   };
//   tasks.todo.push(taskObj); //Pushing the new task into the tasks object.

//   //   Storing the newly created task in the local storage.
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   document.getElementById("todo-count").innerText = `${tasks.todo.length}`;
//   document.getElementById("todo-high").innerText = `${countHigh(
//     tasks.todo
//   )} of ${tasks.todo.length}`;

//   form.reset();
// });

// //   function for edit task
// function editTask(e) {
//   const currentElement = e.currentTarget.closest(".task-item");
//   const currentElementId = currentElement.id;

//   let currentElementObj = null;

//   for (let key in tasks) {
//     tasks[key].forEach((item, index) => {
//       if (item.id === currentElementId) {
//         currentElementObj = item;
//         tasks[key].splice(index, 1);
//       }
//     });
//   }

//   form.task.value = currentElementObj.name;
//   form.date.value = currentElementObj.dueDate;
//   form.priority.value = currentElementObj.priority;
//   form.button.innerText = "Save";

//   currentElement.remove();
// }

// // function for counting the highest priority tasks
// function countHigh(arr) {
//   let ans = 0;
//   arr.forEach((item) => {
//     if (item.priority === "High") ans++;
//   });
//   return ans;
// }

// // Function to apply color based on priority

// function applyColor(priority) {
//   if (priority === "High") return "red";
//   else if (priority === "Medium") return "blue";
//   else return "yellow";
// }

// // Changing task status (to-do, started or completed)

// let draggingElement = null;
// let dropIndex = null;
// function onDragStart(e) {
//   draggingElement = e.target;
// }

// todo.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   dropIndex = 0;
// });

// started.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   dropIndex = 1;
// });

// completed.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   dropIndex = 2;
// });

// // Adding drop event listener to all sections
// todo.addEventListener("drop", dropElement);
// started.addEventListener("drop", dropElement);
// completed.addEventListener("drop", dropElement);

// function dropElement(e) {
//   const prevContainerId = draggingElement.parentNode.id;
//   const currentContainerId = e.currentTarget.id;

//   const prevIndex = tasks[prevContainerId].findIndex(
//     (task) => task.id === draggingElement.id
//   );

//   tasks[currentContainerId].push(tasks[prevContainerId][prevIndex]);
//   tasks[prevContainerId].splice(prevIndex, 1);

//   localStorage.setItem("tasks", JSON.stringify(tasks));

//   e.currentTarget.insertBefore(draggingElement, dropText[dropIndex]);

//   // Remove the dragstart and dragend event listeners from the draggingElement
//   draggingElement.removeEventListener("dragstart", onDragStart);
//   draggingElement.removeEventListener("dragend", onDragEnd);

//   // Update the task count labels
//   updateTaskCounts();

//   // Reset the dropIndex and draggingElement variables
//   dropIndex = null;

//   // Remove the dragover event listener from the new parent
//   e.currentTarget.removeEventListener("dragover", allowDrop);

//   // Re-attach the dragstart and dragend event listeners to the draggingElement
//   draggingElement.addEventListener("dragstart", onDragStart);
//   draggingElement.addEventListener("dragend", onDragEnd);

//   // Re-attach the dragover event listener to the new parent
//   e.currentTarget.addEventListener("dragover", allowDrop);
// }

// function onDragEnd() {
//   // Re-attach the dragstart and dragend event listeners to the draggingElement
//   draggingElement.addEventListener("dragstart", onDragStart);
//   draggingElement.addEventListener("dragend", onDragEnd);
// }

// function allowDrop(e) {
//   e.preventDefault();
//   dropIndex = e.currentTarget.id === "todo" ? 0 : e.currentTarget.id === "started" ? 1 : 2;
// }

// // creating the task if local storage have any data saved

// document.addEventListener("DOMContentLoaded", () => {
//   const extractedData = localStorage.getItem("tasks");
//   let haveData = false;
//   if (extractedData) {
//     tasks = JSON.parse(extractedData);
//     let i = 0;
//     for (let key in tasks) {
//       tasks[key].forEach((item) => {
//         haveData = true;
//         createTask(item.id, item.name, item.dueDate, item.priority, key, i);
//       });
//       i++;
//     }
//   }
// });

// // Function for creating task for stored data in local storage.
// function createTask(id, taskName, taskDueDate, taskPriority, key, i) {
//   const newTask = document.createElement("div");
//   newTask.className = "task-item";
//   newTask.id = id;
//   newTask.setAttribute("draggable", true);
//   newTask.addEventListener("dragstart", onDragStart);

//   newTask.innerHTML = `<div class="header">
//                           <p>Due on ${taskDueDate}</p>
//                           <p class="priority" style="color:${applyColor(
//                             taskPriority.trim()
//                           )};">${taskPriority}</p>
//                       </div>
//                       <div>
//                           <p>${taskName}</p>
//                           <div class="buttons">
//                           </div>
//                       </div>`;

//   let editButton = document.createElement("button");
//   editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;

//   editButton.addEventListener("click", editTask);

//   let deleteButton = document.createElement("button");
//   deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

//   deleteButton.addEventListener("click", deleteTask);
//   newTask.querySelector(".buttons").append(editButton, deleteButton);

//   // Add a highlight class to the newTask element if it matches the search query
//   if (search.value && taskName.toLowerCase().includes(search.value.toLowerCase())) {
//     newTask.classList.add("highlight");
//   }

//   document.getElementById(`${key}`).insertBefore(newTask, dropText[i]);

//   // Function for delete
//   function deleteTask() {
//     const currentContainerId = newTask.parentNode.id;
//     let index = (tasks[currentContainerId].findIndex = (task) =>
//       task.id === newTask.id);
//     tasks[currentContainerId].splice(index, 1);
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//     document.getElementById(
//       `${currentContainerId}-count`
//     ).innerText = `${tasks[currentContainerId].length}`;
//     document.getElementById(
//       `${currentContainerId}-high`
//     ).innerText = `${countHigh(tasks[currentContainerId])} of ${
//       tasks[currentContainerId].length
//     }`;
//     tasks.todo.length
//       ? (document.getElementById("empty-container").style.display = "none")
//       : (document.getElementById("empty-container").style.display = "flex");

//     newTask.remove();
//   }

//   document.getElementById(`${key}-count`).innerText = `${tasks[key].length}`;
//   document.getElementById(`${key}-high`).innerText = `${countHigh(
//     tasks[key]
//   )} of ${tasks[key].length}`;
//   tasks.todo.length
//     ? (document.getElementById("empty-container").style.display = "none")
//     : (document.getElementById("empty-container").style.display = "flex");
// }

// // Filter Functionality

// const filter = document.getElementById("filter");

// // Adding change event for filtering the tasks according to the priorities.
// filter.addEventListener("change", () => {
//   for (let key in tasks) {
//     tasks[key].forEach((item) => {
//       const task = document.getElementById(`${item.id}`);
//       if (task) task.remove();
//     });
//   }

//   if (filter.value === "All") {
//     let i = 0;
//     for (let key in tasks) {
//       tasks[key].forEach((item) => {
//         createTask(item.id, item.name, item.dueDate, item.priority, key, i);
//       });
//       i++;
//     }
//     return;
//   }

//   let i = 0;
//   for (let key in tasks) {
//     tasks[key].forEach((item) => {
//       if (item.priority === filter.value)
//         createTask(item.id, item.name, item.dueDate, item.priority, key, i);
//     });
//     i++;
//   }
// });

// // Filtering data based on Search query.

// const search = document.getElementById("search-input");

// // Function for showing the tasks according to the search query.
// search.addEventListener("input", () => {
//   filter.value = "All";

//   // Remove all tasks from the UI
//   for (let key in tasks) {
//     tasks[key].forEach((item) => {
//       const task = document.getElementById(`${item.id}`);
//       if (task) task.remove();
//     });
//   }

//   let i = 0;
//   for (let key in tasks) {
//     tasks[key].forEach((item) => {
//       if (item.name.toLowerCase().includes(search.value.toLowerCase()))
//         createTask(item.id, item.name, item.dueDate, item.priority, key, i);
//     });
//     i++;
//   }
// });




let tasks = {
  // tasks object for tracking the properties of task item.
  todo: [],
  started: [],
  completed: [],
};

let form = document.getElementById("task-form");
let todo = document.getElementById("todo");
let started = document.getElementById("started");
let completed = document.getElementById("completed");
let dropText = document.getElementsByClassName("drop-text");

let id = 1;

// Listening submit event on form to create new Task
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (form.button.innerText.trim() === "Save") {
    form.button.innerHTML = `Add <i class="fa-solid fa-circle-plus"></i>`;
  }

  document.getElementById("empty-container").style.display = "none";

  const taskName = form.task.value;
  const taskDueDate = form.date.value;
  const taskPriority = form.priority.value;

  const newTask = document.createElement("div");
  newTask.className = "task-item";
  newTask.id = id++;
  newTask.setAttribute("draggable", true);
  newTask.addEventListener("dragstart", onDragStart);

  newTask.innerHTML = `<div class="header">
                          <p>Due on ${taskDueDate}</p>
                          <p class="priority" style="color:${applyColor(
                            taskPriority.trim()
                          )};">${taskPriority}</p>
                      </div>
                      <div>
                          <p>${taskName}</p>
                          <div class="buttons">
                          </div>
                      </div>`;

  // Creating edit button for task
  let editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;

  editButton.addEventListener("click", editTask);

  //   Creating Delete button for task
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

  deleteButton.addEventListener("click", deleteTask);

  //   Extracting buttons container
  newTask.querySelector(".buttons").append(editButton, deleteButton);

  //   Inserting Task element in the task list
  todo.insertBefore(newTask, dropText[0]);

  //   function for delete task
  function deleteTask() {
    const currentContainerId = newTask.parentNode.id;
    let index = (tasks[currentContainerId].findIndex = (task) =>
      task.id === newTask.id);
    tasks[currentContainerId].splice(index, 1);

    // After delete updating the local storage.
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById(
      `${currentContainerId}-count`
    ).innerText = `${tasks[currentContainerId].length}`;
    document.getElementById(
      `${currentContainerId}-high`
    ).innerText = `${countHigh(tasks[currentContainerId])} of ${
      tasks[currentContainerId].length
    }`;

    tasks.todo.length
      ? (document.getElementById("empty-container").style.display = "none")
      : (document.getElementById("empty-container").style.display = "flex");

    newTask.remove();
    editTask();

  }

  //   Creating Task object to store it in local storage.
  let taskObj = {
    id: newTask.id,
    name: taskName,
    dueDate: taskDueDate,
    priority: taskPriority,
  };
  tasks.todo.push(taskObj); //Pushing the new task into the tasks object.

  //   Storing the newly created task in the local storage.
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("todo-count").innerText = `${tasks.todo.length}`;
  document.getElementById("todo-high").innerText = `${countHigh(
    tasks.todo
  )} of ${tasks.todo.length}`;

  form.reset();
});

//   function for edit task
function editTask(e) {
  const currentElement = e.currentTarget.closest(".task-item");
  const currentElementId = currentElement.id;

  let currentElementObj = null;

  for (let key in tasks) {
    tasks[key].forEach((item, index) => {
      if (item.id === currentElementId) {
        currentElementObj = item;
        tasks[key].splice(index, 1);
      }
    });
  }

  form.task.value = currentElementObj.name;
  form.date.value = currentElementObj.dueDate;
  form.priority.value = currentElementObj.priority;
  form.button.innerText = "Save";

  currentElement.remove();
}

// function for counting the highest priority tasks
function countHigh(arr) {
  let ans = 0;
  arr.forEach((item) => {
    if (item.priority === "High") ans++;
  });
  return ans;
}

// Function to apply color based on priority

function applyColor(priority) {
  if (priority === "High") return "red";
  else if (priority === "Medium") return "blue";
  else return "yellow";
}
function updateTaskCounts() {
  for (let key in tasks) {
    document.getElementById(`${key}-count`).innerText = `${tasks[key].length}`;
    document.getElementById(`${key}-high`).innerText = `${countHigh(tasks[key])} of ${tasks[key].length}`;
  }
}
// Changing task status (to-do, started or completed)

let draggingElement = null;
let dropIndex = null;
function onDragStart(e) {
  draggingElement = e.target;
}

todo.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropIndex = 0;
});

started.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropIndex = 1;
});

completed.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropIndex = 2;
});

// Adding drop event listener to all sections
todo.addEventListener("drop", dropElement);
started.addEventListener("drop", dropElement);
completed.addEventListener("drop", dropElement);

function dropElement(e) {
  const prevContainerId = draggingElement.parentNode.id;
  const currentContainerId = e.currentTarget.id;

  const prevIndex = tasks[prevContainerId].findIndex(
    (task) => task.id === draggingElement.id
  );

  tasks[currentContainerId].push(tasks[prevContainerId][prevIndex]);
  tasks[prevContainerId].splice(prevIndex, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskCounts();

  e.currentTarget.insertBefore(draggingElement, dropText[dropIndex]);

  // Remove the dragstart and dragend event listeners from the draggingElement
  draggingElement.removeEventListener("dragstart", onDragStart);
  draggingElement.removeEventListener("dragend", onDragEnd);

  // Update the task count labels
  // updateTaskCounts();

  // Remove the dragover event listener from the new parent
  e.currentTarget.addEventListener("dragover", allowDrop);

  // Update the task count labels
  updateTaskCounts();

  // Remove the dragover event listener from the new parent
  e.currentTarget.removeEventListener("dragover", allowDrop);

  // Re-attach the dragstart and dragend event listeners to the draggingElement
  draggingElement.addEventListener("dragstart", onDragStart);
  draggingElement.addEventListener("dragend", onDragEnd);
}
  // Reset the dropIndex and draggingElement variables
  dropIndex = null;

  // Remove the dragover event listener from the new parent
  e.currentTarget.removeEventListener("dragover", allowDrop);

  // Re-attach the dragstart and dragend event listeners to the draggingElement
  draggingElement.addEventListener("dragstart", onDragStart);
  draggingElement.addEventListener("dragend", onDragEnd);

  // Re-attach the dragover event listener to the new parent
 // Re-attach the dragover event listener to the new parent
 e.currentTarget.addEventListener("dragover", allowDrop);

 // Update the task count labels
 updateTaskCounts();

 // Remove the dragover event listener from the new parent
 e.currentTarget.removeEventListener("dragover", allowDrop);

 // Re-attach the dragstart and dragend event listeners to the draggingElement
 draggingElement.addEventListener("dragstart", onDragStart);
 draggingElement.addEventListener("dragend", onDragEnd);


function allowDrop(e) {
  e.preventDefault();
  dropIndex = e.currentTarget.id === "todo" ? 0 : e.currentTarget.id === "started" ? 1 : 2;
}

// creating the task if local storage have any data saved

document.addEventListener("DOMContentLoaded", () => {
  const extractedData = localStorage.getItem("tasks");
  let haveData = false;
  if (extractedData) {
    tasks = JSON.parse(extractedData);
    let i = 0;
    for (let key in tasks) {
      tasks[key].forEach((item) => {
        haveData = true;
        createTask(item.id, item.name, item.dueDate, item.priority, key, i);
      });
      i++;
    }
  }
});

// Function for creating task for stored data in local storage.
function createTask(id, taskName, taskDueDate, taskPriority, key, i, found = false) {
  const newTask = document.createElement("div");
  newTask.className = "task-item";
  newTask.id = id;
  newTask.setAttribute("draggable", true);
  newTask.addEventListener("dragstart", onDragStart);

  if (found) {
    newTask.classList.add("found");
  }
  newTask.innerHTML = `<div class="header">
                          <p>Due on ${taskDueDate}</p>
                          <p class="priority" style="color:${applyColor(
                            taskPriority.trim()
                          )};">${taskPriority}</p>
                      </div>
                      <div>
                          <p>${taskName}</p>
                          <div class="buttons">
                          </div>
                      </div>`;

  let editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;

  editButton.addEventListener("click", editTask);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

  deleteButton.addEventListener("click", deleteTask);
  newTask.querySelector(".buttons").append(editButton, deleteButton);

  // Add a highlight class to the newTask element if it matches the search query
  if (search.value && taskName.toLowerCase().includes(search.value.toLowerCase())) {
    newTask.classList.add("highlight");
  }

  document.getElementById(`${key}`).insertBefore(newTask, dropText[i]);

  // Function for delete
  function deleteTask() {
    const currentContainerId = newTask.parentNode.id;
    let index = (tasks[currentContainerId].findIndex = (task) =>
      task.id === newTask.id);
    tasks[currentContainerId].splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById(
      `${currentContainerId}-count`
    ).innerText = `${tasks[currentContainerId].length}`;
    document.getElementById(
      `${currentContainerId}-high`
    ).innerText = `${countHigh(tasks[currentContainerId])} of ${
      tasks[currentContainerId].length
    }`;
    tasks.todo.length
      ? (document.getElementById("empty-container").style.display = "none")
      : (document.getElementById("empty-container").style.display = "flex");

    newTask.remove();
  }

  document.getElementById(`${key}-count`).innerText = `${tasks[key].length}`;
  document.getElementById(`${key}-high`).innerText = `${countHigh(
    tasks[key]
  )} of ${tasks[key].length}`;
  tasks.todo.length
    ? (document.getElementById("empty-container").style.display = "none")
    : (document.getElementById("empty-container").style.display = "flex");
}

// Filter Functionality

const filter = document.getElementById("filter");

// Adding change event for filtering the tasks according to the priorities.
filter.addEventListener("change", () => {
  for (let key in tasks) {
    tasks[key].forEach((item) => {
      const task = document.getElementById(`${item.id}`);
      if (task) task.remove();
    });
  }

  if (filter.value === "All") {
    let i = 0;
    for (let key in tasks) {
      tasks[key].forEach((item) => {
        createTask(item.id, item.name, item.dueDate, item.priority, key, i);
      });
      i++;
    }
    return;
  }

  let i = 0;
  for (let key in tasks) {
    tasks[key].forEach((item) => {
      if (item.priority === filter.value)
        createTask(item.id, item.name, item.dueDate, item.priority, key, i);
    });
    i++;
  }
});

// Filtering data based on Search query.

// Filtering data based on Search query.

const search = document.getElementById("search-input");

// Function for showing the tasks according to the search query.
search.addEventListener("input", () => {
  // Remove this line: filter.value = "All";

  // Remove all tasks from the UI
  for (let key in tasks) {
    tasks[key].forEach((item) => {
      const task = document.getElementById(`${item.id}`);
      if (task) task.remove();
    });
  }

  let i = 0;
  for (let key in tasks) {
    tasks[key].forEach((item) => {
      const found = item.name.toLowerCase().includes(search.value.toLowerCase());
      createTask(item.id, item.name, item.dueDate, item.priority, key, i, found);
    });
    i++;
  }
});
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    search.dispatchEvent(new Event("input", { bubbles: true }));
  }
});




// amar
