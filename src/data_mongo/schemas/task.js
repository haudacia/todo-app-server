const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    text: { type: String, required: true },
    date: {
        type: Date,
        set: value => value ? value : null
    },
    done: { type: Boolean, default: false }
})

const Task = model('task', taskSchema);

module.exports = Task;