import { User } from "../models/index.js";
import {sendStudentWelcomeEmail} from "../utils/emailServices.js"
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d", 
    });
};

// 1. REGISTER 
export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (role && role !== 'student') {
            return res.status(403).json({ 
                message: "Registration is restricted to students only. Instructors and Admins must be invited by an Administrator." 
            });
        }

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required." });
        }

        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        const usernameExists = await User.findOne({ where: { username } });
        if (usernameExists) {
            return res.status(400).json({ message: "This username is already taken." });
        }

        const newUser = await User.create({
            username,
            email,
            password,
            role: 'student'
        });

        sendStudentWelcomeEmail(newUser.email, newUser.username);

        return res.status(201).json({
            message: "Student registered successfully!",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                token: generateToken(newUser.id)
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// 2. LOGIN 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required fields." });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        return res.status(200).json({
            message: "Logged in successfully!",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id)
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};