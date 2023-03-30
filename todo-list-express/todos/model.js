const { Schema, model } = require('mongoose');
const Joi = require('joi');

const todoSchema = new Schema({
    title: {
        type: String,
        min: 5,
        max: 20,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
})

const Todo = model('Todo', todoSchema);

const validateTodo = (todo) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(20).required()
    });

    return schema.validate(todo);
}

const validateUpdateTodo = (todo) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(28),
        active: Joi.boolean()
    });

    return schema.validate(todo);
}

module.exports = {
    Todo,
    validateTodo,
    validateUpdateTodo
}
