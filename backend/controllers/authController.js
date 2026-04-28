const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// --- REGISTER LOGIC ---
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already registered." });
        }

        // 2. Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Save to PostgreSQL
        await User.create({ 
            email, 
            password: hashedPassword 
        });

        res.status(201).json({ message: "Registration Successful! Please login." });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Server error during registration." });
    }
};

// --- LOGIN LOGIC ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user in the database
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 2. Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '7d' } // Updated for the best recruiter experience
      );

        // 4. SEND RESPONSE (This matches your LoginPage and Dashboard requirements)
        res.json({
            token: token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error during login." });
    }
};