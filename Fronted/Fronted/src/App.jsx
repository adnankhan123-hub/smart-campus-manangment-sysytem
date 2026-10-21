
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";

function App() {
    const [token, setToken] = useState(
        () => sessionStorage.getItem("token")
    );

    const [page, setPage] = useState("login");

    function handleLoginSuccess(newToken) {
        sessionStorage.setItem("token", newToken);
        setToken(newToken);
    }

 function handleLogout() {
    console.log("LOGOUT FUNCTION RUNNING");

    sessionStorage.removeItem("token");
    setToken(null);
    setPage("login");
}

    if (token) {
        return (
            <Dashboard
                token={token}
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
