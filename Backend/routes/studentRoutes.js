const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
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

// Keep your existing student routes below this line.

module.exports = router;
