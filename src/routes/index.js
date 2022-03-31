const express = require("express");
const studentRoute = require("./students");
const courseRoute = require("./courses");
const teacherRoute = require('./teachers')
const userRoute = require("./users")
const authRoute = require("./auth")

const router  = express.Router();

router.use("/students",studentRoute);
router.use("/courses", courseRoute); 
router.use("/teachers",teacherRoute)
router.use('/users',userRoute)
router.use('/auth',authRoute);
module.exports = router;