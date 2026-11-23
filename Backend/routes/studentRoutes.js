const {
    authMiddleware,
    adminMiddleware
} = require("../middleware/authMiddleware");const express = require("express");
const router = express.Router();

const {
    getStudents,

    createStudent,
 
    deleteStudent
} = require("../controllers/studentControllers");

// GET all students
router.get("/", getStudents);


router.post("/", authMiddleware, createStudent);
router.delete("/:id", authMiddleware, deleteStudent);


module.exports = router;
