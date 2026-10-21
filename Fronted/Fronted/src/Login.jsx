
import { useState } from "react";
import "./Auth.css";

const API_URL = "http://localhost:8080/api/auth";

function Login({ onSignupPage, onLoginSuccess }) {
    const [form, setForm] = useState({
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
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            if (!data.token) {
                throw new Error("The server did not return a token");
            }

            onLoginSuccess(data.token);
        } catch (error) {
            setMessage(error.message || "Could not connect to server");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Welcome Back</h1>
                <p className="auth-subtitle">
                    Login to Smart Campus
                </p>

                {message && (
                    <p className="auth-message">{message}</p>
                )}

                <label htmlFor="login-email">Email</label>
                <input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className="text-button"
                        onClick={onSignupPage}
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Login;
