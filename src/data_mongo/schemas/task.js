const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    text: { type: String, required: true },
    date: Date,
    done: Boolean, //possible shorthand for {type: Boolean}
})

const Task = model('task', taskSchema);

module.exports = Task;