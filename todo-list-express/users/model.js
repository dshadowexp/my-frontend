const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 16
    }
});

const User = model('User', userSchema);

userSchema.methods.generateTokens = () => {

}

const validateUser = (userPayload) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(16).required()
    })

    return schema.validate(userPayload);
}

module.exports = {
    User,
    validateUser
}

