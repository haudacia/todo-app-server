const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    text: { type: String, required: true },
    date: Date,
    done: Boolean, //possible shorthand for {type: Boolean}
})

const Task = model('task', userSchema);

module.exports = Task;