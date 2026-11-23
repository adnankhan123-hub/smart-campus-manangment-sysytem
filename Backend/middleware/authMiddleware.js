
const jwt = require("jsonwebtoken");

// Check whether the user is logged in
function authMiddleware(req, res, next) {
    console.log("AUTH MIDDLEWARE REACHED");

    const authHeader = req.headers.authorization;

    // Check whether token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user information to request
        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

// Check whether logged-in user is admin
function adminMiddleware(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin only."
        });
    }

    next();
}

module.exports = {
    authMiddleware,
    adminMiddleware
};
