require("dotenv").config({ path: "../.env" });

const Student = require("../models/Student");
const connectDB = require("../config/db");

async function initData() {
    try {
        await connectDB();

        const student = await Student.create({
            name: "Adnan Khan",
            email: "adnan@example.com",
            department: "Software Engineering",
            semester: 5
        });

        console.log(student);
    } catch (error) {
        console.log(error.message);
    } finally {
        process.exit();
    }
}

initData();