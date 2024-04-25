const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    //mongo generates it automatically internally, and it is unique. cuando
    // se crea una nueva tarea. //id mongo le asigna a la nueva tarea.
    text: {type: String, required: true},
    date: {type: Date},
    done: Boolean, //possible shorthand for {type: Boolean}
})

const Task = model('task', userSchema);

module.exports = Task;