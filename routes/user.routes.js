const express = require('express');
const userController = require('../controllers/userController');
const tokenVerify = require('../middleware/tokenVerify');
const upload = require('../middleware/uploadFile');
const { userCreateValidation, userUpdateValidation } = require('../validation/user.validation');
const router = express.Router();

router.get('/user', tokenVerify, userController.getUsers);
router.post('/user/create', tokenVerify, upload.single('photo'), userCreateValidation, userController.createUser);
router.post('/user/update', tokenVerify, upload.single('photo'), userUpdateValidation, userController.updateUser);
router.delete('/user/delete/:id', tokenVerify, userController.deleteUser);
router.get('/user/:id', tokenVerify, userController.findUser);


module.exports = router;