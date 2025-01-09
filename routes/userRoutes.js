const express = require('express'); 
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

router.post('/login', userController.authenticateUser);

router.put('/useradd', userController.addUser);

router.delete('/userdelete', userController.deleteUser);

router.patch('/userpatch', userController.patchUser);

module.exports = router;