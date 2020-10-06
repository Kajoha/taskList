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
