import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

// Step 2a — Verify request has a valid Bearer token
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Access denied. Authentication token missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });

        if (!req.user) {
            return res.status(401).json({ message: "Session invalid. User no longer exists." });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Access denied. Session token expired or corrupted." });
    }
};

// Step 2b — Verify request user matches authorized role permissions
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Forbidden. Your role '${req.user.role}' is unauthorized to perform this action.`
            });
        }
        next();
    };
};