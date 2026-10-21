
import { useState, useEffect, useCallback } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

function Dashboard({ token, onLogout }) {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch students from the backend
    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8080/students",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // If the token is invalid, log out
            if (response.status === 401) {
                onLogout();
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to load students");
            }

            const data = await response.json();
            setStudents(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [token, onLogout]);

    // Load students when Dashboard opens
    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    // Calculate dashboard statistics
    const totalDepartments = new Set(
        students.map((student) => student.department)
    ).size;

    const totalSemesters = new Set(
        students.map((student) => student.semester)
    ).size;

    return (
        <div className="app-layout">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Dashboard */}
            <main className="main-content" id="dashboard">

                <Header />

                {/* Welcome Section */}
                <section className="welcome">
                    <div>
                        <p>SMART CAMPUS MANAGEMENT</p>
                        <h2>Welcome to your dashboard!</h2>
                        <span>
                            Manage your student records in one place.
                        </span>
                    </div>

                    <div className="welcome-icon">SC</div>

                    <button
                        type="button"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </section>

                {/* Statistics Cards */}
                <section className="stats-grid">

                    <StatCard
                        title="Total Students"
                        value={loading ? "..." : students.length}
                        description="Registered student records"
                        icon="♙"
                        color="blue"
                    />

                    <StatCard
                        title="Departments"
                        value={loading ? "..." : totalDepartments}
                        description="Departments represented"
                        icon="▤"
                        color="purple"
                    />

                    <StatCard
                        title="Semesters"
                        value={loading ? "..." : totalSemesters}
                        description="Semesters represented"
                        icon="▦"
                        color="orange"
                    />

                </section>

                {/* Student Management Section */}
                <section
                    className="content-panel"
                    id="students"
                >

                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">
                                STUDENT RECORDS
                            </p>

                            <h2>Manage Students</h2>
                        </div>

                        <span className="record-count">
                            {students.length} records
                        </span>
                    </div>

                    {/* Add Student Form */}
                    <div className="form-section">
                        <h3>Add New Student</h3>

                        <StudentForm
                            token={token}
                            onStudentAdded={fetchStudents}
                        />
                    </div>

                    {/* Student List */}
                    <div className="table-section">
                        <h3>All Students</h3>

                        {loading ? (
                            <p className="message">
                                Loading students...
                            </p>
                        ) : error ? (
                            <p className="error-message">
                                {error}
                            </p>
                        ) : (
                            <StudentList
                                students={students}
                                token={token}
                                onStudentDeleted={fetchStudents}
                            />
                        )}
                    </div>

                </section>

                {/* Footer */}
                <footer className="page-footer">
                    Smart Campus Management System
                </footer>

            </main>
        </div>
    );
}

export default Dashboard;
