var express = require('express');
var router = express.Router();

const authRoutes = require("./subRoutes/auth");
const locRoutes = require("./subRoutes/location");

router.use('/auth', authRoutes);
router.use('/location', locRoutes);

module.exports = router;
