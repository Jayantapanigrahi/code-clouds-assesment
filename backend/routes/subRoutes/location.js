var express = require('express');
var router = express.Router();


const { adminController } = require("../../controllers/admin/AdminController");

router.get('/getLocation', adminController.getLocation);
router.post('/updateLocation', adminController.updateLocation);
router.post('/checkLocation', adminController.checkLocation);
module.exports = router;
