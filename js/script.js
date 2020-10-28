/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */

// Esto es lo que va dentro del modelo
let task = [];

// Conexión al API usando fetch.
fetch('https://js2-tareas-api.netlify.app/api/tareas?uid=19')
  .then((response) => response.json())
  .then((data) => {
    task = data;
  });

// Creamos la fución para añadir tareas
function addTask(taskName, taskDate, taskCompleted) {
  // Se crea un objeto para la nueva tarea
  const newTask = {
    name: taskName,
    complete: taskCompleted,
    date: taskDate,
  };

  // agrego la tarea al array
  task.push(addTask);

  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(newTask),
  };

  fetch('https://js2-tareas-api.netlify.app/api/tareas?uid=19', fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      appendTaskDOM(data);
    });
}

// Actualiza el estado de una tarea
function taskStatus(id, complete) {
// recorre la lista de tareas
  for (let i = 0; i < task.length; i++) {
    // cuando encuentra la tarea con el id correcto cambia su estado
    if (task[i]._id === id) {
      task[i].completo = complete;
    }
  }
  localStorage.setItem('task', JSON.stringify(task));
}

// borrar una tarea
function deleteTask(id) {
  // recorrer la lista de tareas
  for (let i = 0; i < task.length; i++) {
    // cuando encuentra la tarea con el id la borra
    if (task[i]._id === id) {
      task.splice(i, 1);
    }
  }
}

// Aquí empezamos a añadir la Vista

// Añadimos la lista de tarea, interactuamos con el DOM
const list = document.getElementById('task-list');

function appendTaskDOM(taskTask) {
  // Item de la lista
  const item = document.createElement('li');
  item.className = 'task-list__item';
  // checkbox
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', `taskTask-${taskTask._id}`);
  checkbox.checked = taskTask.complete;
  // Label.
  const label = document.createElement('label');
  label.setAttribute('for', `taskTask-${taskTask._id}`);
  label.innerHTML = `${taskTask.name} - ${taskTask.date}`;
  // boton de borrar
  const buttonDelete = document.createElement('button');
  buttonDelete.className = 'task-list__delete';
  buttonDelete.setAttribute('id', `delete-${taskTask._id}`);
  buttonDelete.innerHTML = 'Delete';

  // Se agregan elementos.
  item.appendChild(checkbox);
  item.appendChild(label);
  list.appendChild(item);
  item.appendChild(buttonDelete);

  // Evento para marcar la tarea como completa
  checkbox.addEventListener('click', (event) => {
    const complete = event.currentTarget.checked;
    const itemId = event.currentTarget.getAttribute('id');
    const taskId = parseInt(itemId.substring(6), 10);
    taskStatus(taskId, complete);
  });

  // borramos la tarea
  buttonDelete.addEventListener('click', (event) => {
    const itemId = event.currentTarget.getAttribute('id');
    const taskId = parseInt(itemId.substring(7), 10);
    deleteTask(taskId);
    // Borra la tarea en el DOM.
    event.currentTarget.parentNode.remove();
  });
}

// Aquí va lo correspondiente al contador

const form = document.getElementById('new-task-form');
// El evento de submit en del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(form.elements[0].value, form.elements[1].value, false);
  form.elements[0].value = '';
  form.elements[1].value = '';
});
