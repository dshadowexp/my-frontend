const { Router } = require('express');
const userController = require('./controller');

const router = Router();

router.post('/', userController.createUserHandler);

router.post('/auth', userController.authenticateUserHandler);

router.post('/refreshToken', userController.refreshTokenHandler);

module.exports = router;