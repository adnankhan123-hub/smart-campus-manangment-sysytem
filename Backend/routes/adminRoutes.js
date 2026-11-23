
const express = require("express");
const router = express.Router();

const {
    authMiddleware,
    adminMiddleware
} = require("../middleware/authMiddleware");

// Admin dashboard test route
router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    (req, res) => {
        res.status(200).json({
            message: "Welcome to the Admin Dashboard!",
            user: req.user
        });
    }
);

module.exports = router;
