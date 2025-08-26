    const jwt = require("jsonwebtoken");
    require('dotenv').config(); // Make sure to require dotenv

    // Use the environment variable for the JWT secret
    const JWT_SECRET = process.env.JWT_SECRET;

    const auth = (req, res, next) => {
      const authHeader = req.headers["authorization"];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Authorization denied. No token provided or malformed." });
      }

      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token has expired." });
        }
        return res.status(401).json({ success: false, message: "Token is not valid." });
      }
    };

    module.exports = auth;
    