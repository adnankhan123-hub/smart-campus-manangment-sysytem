
const Student = require("../models/Student");

async function getStudents(req, res) {
    try {
        const { search, department } = req.query;

        const filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        if (department) {
            filter.department = department;
        }

        const students = await Student.find(filter).sort({
            createdAt: -1
        });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
}



// POST a student
async function createStudent(req, res) {
    try {
        const { name, email, department, semester } = req.body;

        if (!name || !email || !department || semester === undefined || semester === "") {
            return res.status(400).json({
                message: "Name, email, department, and semester are required"
            });
        }

        const student = await Student.create({
            name,
            email,
            department,
            semester
        });

        res.status(201).json(student);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "This email is already registered"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: "Failed to create student"
        });
    }
}



// DELETE a student
async function deleteStudent(req, res) {
    try {
        const deletedStudent = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!deletedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid student ID"
        });
    }
}

module.exports = {
    getStudents,

    createStudent,
  
    deleteStudent
};
