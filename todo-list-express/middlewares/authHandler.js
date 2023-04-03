const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = res.header('x-auth-token');
    const secretKey = 'secret';

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded._id;
        next();
    } catch (error) {
        res.status(403).send('Invalid token');
    }
}