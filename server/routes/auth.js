    const express = require("express");
    const router = express.Router();
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");
    const { body, validationResult } = require('express-validator'); // Import express-validator
    const User = require("../models/User");
    const auth = require("../middleware/authmiddleware");
    require('dotenv').config();

    const JWT_SECRET = process.env.JWT_SECRET;

    /**
     * @route   POST /api/auth/signup
     * @desc    Registers a new user with validation
     * @access  Public
     */
    router.post(
      "/signup",
      // --- Start of New Validation Rules ---
      [
        body('firstName', 'First name is required').not().isEmpty(),
        body('lastName', 'Last name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character')
          .isLength({ min: 8 })
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ],
      // --- End of New Validation Rules ---
      async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password, role, firstName, lastName } = req.body;

        try {
          let user = await User.findOne({ email });
          if (user) {
            return res.status(400).json({ success: false, message: "User with this email already exists." });
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || "customer",
          });

          await user.save();
          res.status(201).json({ success: true, message: "User registered successfully." });

        } catch (err) {
          console.error("Signup Error:", err.message);
          res.status(500).json({ success: false, message: "Server error during signup." });
        }
      }
    );

    /**
     * @route   POST /api/auth/login
     * @desc    Authenticates a user and returns a JWT
     * @access  Public
     */
    router.post("/login", async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password." });
      }
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ success: false, message: "Invalid credentials." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: "Invalid credentials." });
        }
        const payload = { id: user._id, role: user.role, firstName: user.firstName }; // Added firstName to payload
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
        res.json({ success: true, token, role: user.role, message: "Logged in successfully." });
      } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ success: false, message: "Server error during login." });
      }
    });

    /**
     * @route   GET /api/auth/verify
     * @desc    Verifies a token's validity via middleware
     * @access  Private
     */
    router.get("/verify", auth, (req, res) => {
      res.json({ success: true, message: "Token is valid.", user: req.user });
    });

    module.exports = router;
