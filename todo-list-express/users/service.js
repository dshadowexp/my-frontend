const { User } = require('./model');

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const createUser = async (userPayload) => {
    const user = new User(userPayload);
    await user.save();
    return user;
}

module.exports = {
    getUserByEmail,
    createUser
}