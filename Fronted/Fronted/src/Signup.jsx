
import { useState } from "react";
import "./Auth.css";

const API_URL = "http://localhost:8080/api/auth";

function Signup({ onLoginPage }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            setMessage("Account created! You can now log in.");
            setForm({ name: "", email: "", password: "" });
        } catch (error) {
            setMessage(error.message || "Could not connect to server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <p className="auth-subtitle">
                    Join Smart Campus
                </p>

                {message && (
                    <p className="auth-message">{message}</p>
                )}

                <label htmlFor="signup-name">Full Name</label>
                <input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="signup-email">Email</label>
                <input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="signup-password">Password</label>
                <input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="text-button"
                        onClick={onLoginPage}
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Signup;
