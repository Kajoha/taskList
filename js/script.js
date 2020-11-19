/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
// Esto es lo que va dentro del modelo
const uid = 19;
let task = [];

// Conexión al API usando fetch.
fetch(`https://js2-tareas-api.netlify.app/api/tareas?uid=${uid}`)
  .then((response) => response.json())
  .then((data) => {
    task = data;
    for (let i = 0; i < task.length; i++) {
      appendTaskDOM(task[i]);
    }
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
  task.push(newTask);

  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(newTask),
  };

  fetch(`https://js2-tareas-api.netlify.app/api/tareas?uid=${uid}`, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      appendTaskDOM(data);
    });
}

// Actualiza el estado de una tarea
function taskStatus(id, complete) {
  // recorre la lista de tareas
  const taskMet = task.find((task) =>
  task._id === id);
  if (taskMet) {
    taskMet.complete = complete;
    const taskUpdated = {
      name: taskUpdated.name,
      complete,
      date: taskUpdated.date,
    };
    const fetchOptions = {
      method: 'PUT',
      body: JSON.stringify(taskUpdated),
  };

  fetch(`https://js2-tareas-api.netlify.app/api/tareas/${id}?uid=${uid}`, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// borrar una tarea
function deleteTask(id) {
  // recorrer la lista de tareas
  for (let i = 0; i < task.length; i++) {
    // cuando encuentra la tarea con el id la borra
    if (tareas[i]._id === id) {
      tareas.splice(i, 1);
      const fetchOptions = {
        method: 'DELETE',
      };

      fetch(`https://js2-tareas-api.netlify.app/api/tareas/${id}?uid=${uid}`, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    break;
    }
  }
}

// Aquí empezamos a añadir la Vista

// Añadimos la lista de tarea, interactuamos con el DOM

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
    // eslint-disable-next-line radix
    const taskId = itemId.split('-')[1];
    taskStatus(taskId, complete);
  });

  // borramos la tarea
  buttonDelete.addEventListener('click', (event) => {
    const itemId = event.currentTarget.getAttribute('id');
    const taskId = itemId.split('-')[1];
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
