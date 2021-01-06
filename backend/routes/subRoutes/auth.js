var express = require('express');
var router = express.Router();

const { authController } = require("../../controllers/users/AuthController");
const { adminController } = require("../../controllers/admin/AdminController");
router.post('/login', authController.login);
router.post('/admin/login', adminController.login);
module.exports = router;
