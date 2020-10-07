//Esto es lo que va dentro del modelo

// Iniciamos creando un contador para la lista de tareas para agrefarle un id unico a cada tarea
let taskCounter = 0;
// ahora creamos un array para almacenar las tareas
let task = [];

//Creamos la fución para añadir tareas

function addTask(taskName, taskDate, taskCompleted) {
    //Se crea un objeto para la nueva tarea
    const newTask = {
        id: taskCounter,
        nombre: taskName,
        completo: taskCompleted,
        fecha: taskDate,
    };

    //agrego la tarea al array
    task.push(newTask);
    // incrementamos el contador de la tarea
    taskCounter++;
}

// Aquí empezamos a añadir la Vista

//Añadimos la lista de tarea, interactuamos con el DOM
const list = document.getElementById('task-list');

function appendTaskDOM(taskTask) {
    //Item de la lista
    const item = document.createElement('li');
    item.className = 'task-list__item';
    // checkbox
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `taskTask-${taskTask.id}`);
    // Label.
    const label = document.createElement('label');
    label.setAttribute('for', `taskTask-${taskTask.id}`);
    label.innerHTML = `${taskTask.nombre} - ${taskTask.fecha}`;
    
    // Se agregan elementos.
    item.appendChild(checkbox);
    item.appendChild(label);
    lista.appendChild(item);
}

// se crea la lista del en el DOM con las tareas que existen
for (let i = 0; i < task.length; i++) {
    appendTaskDOM(task[i]);
}

// Aquí va lo correspondiente al contador

const form = document.getElementById('new-task-form');
//El evento de submit en del formulario
form.addEventListener('submit', (event) => {
    //cancelamos el comportamiento default del formulario de la siguiente manera
    event.preventDefault();
    //agregamos el item
    addTask(form.elements[0].value, form.elements[1].value, false);
    //Esto para reserear el form
    form.elements[0].value = '';
    form.elements[1].value = '';
})
