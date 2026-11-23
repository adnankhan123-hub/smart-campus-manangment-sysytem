
import { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./pages/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import "./App.css";

function App() {
    const [session, setSession] = useState(() => {
        try {
            const token = sessionStorage.getItem("token");
            const user = JSON.parse(
                sessionStorage.getItem("user") || "null"
            );

            if (token && user && ["admin", "user"].includes(user.role)) {
                return { token, user };
            }
        } catch (error) {
            console.log("Invalid saved session");
        }

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        return null;
    });

    const [page, setPage] = useState("login");

    function handleLoginSuccess(newToken, loggedInUser) {
        sessionStorage.setItem("token", newToken);
        sessionStorage.setItem("user", JSON.stringify(loggedInUser));

        setSession({
            token: newToken,
            user: loggedInUser
        });
    }

    function handleLogout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        setSession(null);
        setPage("login");
    }

    if (session?.user.role === "admin") {
        return (
            <AdminDashboard
                token={session.token}
                onLogout={handleLogout}
            />
        );
    }

    if (session?.user.role === "user") {
        return (
            <Dashboard
                token={session.token}
                onLogout={handleLogout}
            />
        );
    }

    if (page === "signup") {
        return (
            <Signup
                onLoginPage={() => setPage("login")}
            />
        );
    }

    return (
        <Login
            onSignupPage={() => setPage("signup")}
            onLoginSuccess={handleLoginSuccess}
        />
    );
}

export default App;
