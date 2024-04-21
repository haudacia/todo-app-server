const express = require('express');

//importamos el fichero con los datos que necesita nuestro Router
const {todos} = require('../data/index');
/*

Un Router de express es como un switch case de Javascript. Simplemente redirige las peticiones hacia la ruta correcta, si esta existe.

En una aplicacion de express podemos tener tantos Routers como queramos/sean necesarios. Lo habitual cuando se implementa una API REST
es tener un Router por cada "recurso" de la api. Si imaginamos una aplicacion que tiene 3 recursos (User, Todo, Category), deberiamos
tener 3 routers diferentes: userRouter, todoRouter y categoryRouter.
*/

const todoRouter = express.Router();


todoRouter.get('/todos', (req, res) => {
  res.json(todos);
});


todoRouter.post('/todo', (req, res) => {
  const newData = req.body;
  const newTask = {
    id: todos.length + 1,
    text: newData.text,
    fecha: new Date(newData.fecha),
    done: false
  }
  todos.push(newTask);
  res.status(201).json(newTask);

  //crear un nuevo objeto con estructura {id, text, fecha, done} con los datos que vienen en el BODY de la Request y meterlos dentro de el array.
  //el nuevo objeto debe tener como id un numero mas que el numero actual de elementos guardados en el array.

});


/*
En este endpoint, el path contiene una variable llamada id. La syntaxis que utiliza express para estos casos es el simbolo :

Una variable en un path, significa que express recoge el valor que va justo después de /todo/ y lo guarda en una variable dentro del objeto "req"
con el mismo nombre que hemos utilizado en el path.

Ejemplo:

Si con Insomnia o Postman hicisemos una peticion GET a la ruta /todo/12, está será dirigida directamente hasta este endpoint.


*/
todoRouter.get('/todo/:id',  (req, res) => {
  const requestedId = parseInt(req.params.id);
  const matchingTask = todos.find((task) => task.id === requestedId);
  if (matchingTask) {
    res.status(200).json(matchingTask)
  } else {
    res.status(404).send(`Task with ID ${requestedId} doesn't exist :T`)
  }
  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.

  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, devolverlo como formato JSON y codigo de status 200.

  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
});
// DIVIDIR ARCHIVOS EN ROUTERS PARA ADD UN ROUTE ESPECIFICO PARA GET CON QUERY
todoRouter.get('/todos/byText',  (req, res) => {
  //hacer aceptar cualquer key presente en el erray "todos" para el query(sea
// fecha, id, text o completed))
//usar map o forEach
  const queryText = req.query.text.toLowerCase();
  const tasksByText = todos.find(
    (task) => task.text.toLowerCase().includes(queryText)
  );
  res.json(tasksByText)

  // falta aviso de error/termo no existente

    /* INCLUDES ERROR BUT NOT TESTED:
    todoRouter.get('/todo/',  (req, res) => {
  const queryText = req.query.text;
  Object.values(todos).map((value) => {
    if (value.includes(queryText)) {
      res.json(todos.filter((task) => task.text.includes(queryText)));
    } else {
    res.status(404).send(`Task(s) not found`)
    }
    */
  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.

  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, devolverlo como formato JSON y codigo de status 200.

  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
});
// MISSING '/todo/:id' PATCH

todoRouter.patch('/todo/:id',  (req, res) => {
  const requestedId = parseInt(req.params.id);
  const index = todos.findIndex((task) => task.id === requestedId);
  const newData = req.body;
  if (index !== -1) {
    const updatedTask = { ...todos[index], ...newData };
    todos[index] = updatedTask;
    res.status(200).send(todos)
  } else {
    res.status(404).send(`Couldn't find a task with ID ${requestedId} to be updated`)
  }

  /* previous unsuccessful attempt for patch:
  todoRouter.patch('/todo/:id',  (req, res) => {
  const requestedId = parseInt(req.params.id);
  const index = todos.findIndex((task) => task.id === requestedId);
  const newData = req.body;
  if (index !== -1) {
    Object.keys(todos).forEach((key => {
      if (todos[index].hasOwnProperty(key)) {
        todos[index][key] = newData[key];
        res.status(200).send(todos)
      }
    }))
  } else {
    res.status(404).send(`There is no task with ID ${requestedId} to be updated`)
  }
  */
  
  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.
  
  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, lo ACTUALIZAMOS con los datos del BODY de la Request y lo devolvemos como formato JSON y codigo de status 200.
  
  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
  
});

// MISSING '/todo/:id' DELETE
todoRouter.delete('/todo/:id',  (req, res) => {
  const requestedId = parseInt(req.params.id);
  const index = todos.findIndex((task) => task.id === requestedId);
  if (index !== -1) {
    const deletedTask = todos.splice(index, 1);
    res.status(204).send();
    // res.status(204).end()
  } else {
    res.status(404).send(`Task with ID ${requestedId} not found`);
  }
  //recogemos el valor de la varSiable sdel path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.
  
  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, lo BORRAMOS y devolvemos un codigo de status 204.
  
  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
  
});


//exportamos el router para poder 'usarlo' en nuestra app.
module.exports = todoRouter;
