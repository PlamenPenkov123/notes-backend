import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { redisClient } from "../config/redis.js";


export const register = async (req, res) => {
    try {
        const { username, email, password, passwordConfirm } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already registered" });

        if (password !== passwordConfirm) return res.status(400).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = req.user;
        const expiresAt = decoded.exp * 1000;

        const ttl = Math.floor((expiresAt - Date.now()) / 1000);

        await redisClient.set(`bl:${token}`, "1", { EX: ttl });

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: err.message });
    }
}
