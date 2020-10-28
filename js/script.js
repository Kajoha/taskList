/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */

// Esto es lo que va dentro del modelo

let taskCounter = 0;
let task = [];

// Conexión al API usando fetch.
fetch('https://js2-tareas-api.netlify.app/api/tareas?uid=19')
  .then((response) => response.json())
  .then((data) => {
    task = data;

    // se crea la lista del en el DOM con las tareas que existen
    for (let i = 0; i < task.length; i++) {
      appendTaskDOM(task[i]); // eslint-disable no-use-before-define
    }
  });

// Creamos la fución para añadir tareas
function addTask(taskName, taskDate, taskCompleted) {
  // Se crea un objeto para la nueva tarea
  const newTask = {
    _id: taskCounter,
    name: taskName,
    complete: taskCompleted,
    date: taskDate,
  };

  // agrego la tarea al array
  task.push(newTask);
  // incrementamos el contador de la tarea
  taskCounter++;
  // Guardamos el contador de tareas en el localStorage
  localStorage.setItem('counter', taskCounter);
  // Me faltaba agrega el apped para verlo en el DOM
  appendTaskDOM(newTask);
  // Guardamos la lista dentro del localStorage
  localStorage.setItem('task', JSON.stringify(task));
}

// Actualiza el estado de una tarea
function taskStatus(id, complete) {
// recorre la lista de tareas
  for (let i = 0; i < task.length; i++) {
    // cuando encuentra la tarea con el id correcto cambia su estado
    if (task[i].id === id) {
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
    if (task[i].id === id) {
      task.splice(i, 1);
    }
  }
  // Guardar la lista de tareas actualizada en el localStoraage
  localStorage.setItem('task', JSON.stringify(task));
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
  // cancelamos el comportamiento default del formulario de la siguiente manera
  event.preventDefault();
  // agregamos el item
  addTask(form.elements[0].value, form.elements[1].value, false);
  // Esto para reserear el form
  form.elements[0].value = '';
  form.elements[1].value = '';
});
