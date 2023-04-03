const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(password, salt);
}

const validatePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    validatePassword
}