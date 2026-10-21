
function StudentList({ students, onStudentDeleted }) {
    async function handleDelete(id, name) {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${name}?`
        );

        if (!confirmed) return;

        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                throw new Error("Please log in again.");
            }

            const response = await fetch(
                `http://localhost:8080/students/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete student"
                );
            }

            alert("Student deleted successfully!");

            // Refresh the student list
            await onStudentDeleted();
        } catch (error) {
            alert(error.message);
        }
    }

    if (students.length === 0) {
        return <p className="message">No students found yet.</p>;
    }

    return (
        <div className="table-wrapper">
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Semester</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>
                                <div className="student-name">
                                    <div className="student-avatar">
                                        {student.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <strong>{student.name}</strong>
                                </div>
                            </td>

                            <td>{student.email}</td>
                            <td>{student.department}</td>

                            <td>
                                <span className="semester-badge">
                                    Semester {student.semester}
                                </span>
                            </td>

                            <td>
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(
                                            student._id,
                                            student.name
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
