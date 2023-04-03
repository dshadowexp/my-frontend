const userService = require('./service');
const { validateUser } = require('./model');
const { validatePassword, hashPassword } = require('../utils/hashing');

const createUserHandler = async (req, res) => {
    // validate the request body
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    // check if the user already exists
    let existingUser = await userService.getUserByEmail(req.body.email);
    if (existingUser)
        return res.status(409).send({message: 'User already exists'});

    // hash the password, save user payload, send response
    req.body.password = await hashPassword(req.body.password);
    const user = await userService.createUser(req.body);
    
    res.status(201).send(user);
}

const authenticateUserHandler = async (req, res) => {

}

const refreshTokenHandler = async (req, res) => {

}

module.exports = {
    createUserHandler, 
    authenticateUserHandler,
    refreshTokenHandler
}