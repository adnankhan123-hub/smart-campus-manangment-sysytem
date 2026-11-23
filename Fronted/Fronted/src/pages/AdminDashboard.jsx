
import { useState, useEffect, useCallback } from "react";
import "./AdminDashboard.css";

const API_URL = "http://localhost:8080/students";

function AdminDashboard({ token, onLogout }) {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // Fetch students from backend
    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // If token is invalid or expired
            if (response.status === 401) {
                onLogout();
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch students"
                );
            }

            // Save students received from backend
            setStudents(data);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [token, onLogout]);

    // Fetch students when dashboard opens
    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    // Calculate total departments
    const totalDepartments = new Set(
        students
            .map(student => student.department)
            .filter(Boolean)
    ).size;

    // Search students by name or email
    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(search.toLowerCase()) ||
        student.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-dashboard">

            {/* Header */}
            <header className="admin-header">
                <h2>Smart Campus Admin</h2>

                <button onClick={onLogout}>
                    Logout
                </button>
            </header>

            <main className="admin-content">

                <h1>Welcome, Admin!</h1>
                <p>Manage your campus from one place.</p>

                {/* Statistics */}
                <div className="admin-stats">

                    <div className="admin-card">
                        <h3>Total Students</h3>
                        <h1>{loading ? "..." : students.length}</h1>
                    </div>

                    <div className="admin-card">
                        <h3>Total Departments</h3>
                        <h1>{loading ? "..." : totalDepartments}</h1>
                    </div>

                    <div className="admin-card">
                        <h3>Total Users</h3>
                        <h1>--</h1>
                        <small>Coming soon</small>
                    </div>

                </div>

                {/* Student Management */}
                <section className="student-management">

                    <div className="student-heading">
                        <h2>Manage Students</h2>

                        <button
                            onClick={fetchStudents}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Refresh"}
                        </button>
                    </div>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by student name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="student-search"
                    />

                    {/* Error */}
                    {error && (
                        <p className="admin-error">
                            {error}
                        </p>
                    )}

                    {/* Loading */}
                    {loading && (
                        <p>Loading student records...</p>
                    )}

                    {/* Student Table */}
                    {!loading && !error && (
                        <div className="student-table-container">

                            <table className="student-table">

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Semester</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map(student => (
                                            <tr key={student._id}>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>{student.department}</td>
                                                <td>{student.semester}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">
                                                No students found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>

                        </div>
                    )}

                </section>

            </main>
        </div>
    );
}

export default AdminDashboard;
