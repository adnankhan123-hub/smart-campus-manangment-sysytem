
function StudentForm({ onStudentAdded }) {
    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;

        const student = {
            name: form.name.value,
            email: form.email.value,
            department: form.department.value,
            semester: Number(form.semester.value)
        };

        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/students",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(student)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add student"
                );
            }

            form.reset();
            await onStudentAdded();

            alert("Student added successfully!");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                placeholder="Name"
                required
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                required
            />

            <input
                name="department"
                placeholder="Department"
                required
            />

            <input
                name="semester"
                type="number"
                placeholder="Semester"
                min="1"
                required
            />

            <button type="submit">Add Student</button>
        </form>
    );
}

export default StudentForm;
