const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Get the token from the header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    // 2. If no token, block access
    if (!token) {
        return res.status(403).json({ error: "Access Denied. No token provided." });
    }

    try {
        // 3. Verify the token 
        // We add a fallback 'your_secret_key' in case your .env file isn't loading
        const secret = process.env.JWT_SECRET || 'your_secret_key';
        const verified = jwt.verify(token, secret);
        
        // 4. Attach the user data to the request
        req.user = verified; 
        
        next(); // Move to the next function (the controller)
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.status(401).json({ error: "Invalid Token" });
    }
};

module.exports = verifyToken;