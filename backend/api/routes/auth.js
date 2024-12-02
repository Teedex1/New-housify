const router = require("express").Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validate, validateUserRegistration } = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const { sendEmail, getPasswordResetTemplate, getEmailVerificationTemplate } = require('../utils/email');

// Register User
router.post("/register", async (req, res, next) => {
    try {
        // Validate input
        const { error } = validateUserRegistration(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check if user exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Create new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: "user",
            name: req.body.name,
            phone: req.body.phone,
            preferences: req.body.preferences
        });

        // Save user
        await user.save();

        // Generate tokens
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        const refreshToken = user.generateRefreshToken();
        await user.save();

        // Remove password from response
        const { password, ...userInfo } = user._doc;
        res.status(201).json({
            ...userInfo,
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error('Registration error:', err);
        next(err);
    }
});

// Verify token
router.get("/verify", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(500).json({ message: "Server error" });
    }
});

// Refresh token
router.post("/refresh-token", async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        // Find user with refresh token
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Verify refresh token
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Generate new tokens
        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        const newRefreshToken = user.generateRefreshToken();
        await user.save();

        res.json({
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        console.error('Refresh token error:', err);
        next(err);
    }
});

// Forgot Password
router.post("/forgot-password", async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "No account with that email exists" });
        }

        // Generate reset token
        const resetToken = user.generatePasswordResetToken();
        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                html: getPasswordResetTemplate(resetUrl, user.username)
            });

            res.status(200).json({ message: "Password reset email sent" });
        } catch (err) {
            user.passwordReset.token = undefined;
            user.passwordReset.tokenExpires = undefined;
            await user.save();

            return res.status(500).json({ message: "Error sending email" });
        }
    } catch (err) {
        next(err);
    }
});

// Reset Password
router.post("/reset-password/:token", async (req, res, next) => {
    try {
        // Get hashed token
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            'passwordReset.token': hashedToken,
            'passwordReset.tokenExpires': { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Set new password
        user.password = req.body.password;
        user.passwordReset.token = undefined;
        user.passwordReset.tokenExpires = undefined;
        user.passwordReset.lastReset = Date.now();
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
        next(err);
    }
});

// Send Verification Email
router.post("/send-verification-email", auth, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verificationStatus.isVerified) {
            return res.status(400).json({ message: "Email already verified" });
        }

        // Generate verification token
        const verificationToken = user.generateVerificationToken();
        await user.save();

        // Create verification URL
        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Email Verification',
                html: getEmailVerificationTemplate(verifyUrl, user.username)
            });

            res.status(200).json({ message: "Verification email sent" });
        } catch (err) {
            user.verificationStatus.token = undefined;
            user.verificationStatus.tokenExpires = undefined;
            await user.save();

            return res.status(500).json({ message: "Error sending email" });
        }
    } catch (err) {
        next(err);
    }
});

// Verify Email
router.get("/verify-email/:token", async (req, res, next) => {
    try {
        // Get hashed token
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            'verificationStatus.token': hashedToken,
            'verificationStatus.tokenExpires': { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        // Update verification status
        user.verificationStatus.isVerified = true;
        user.verificationStatus.token = undefined;
        user.verificationStatus.tokenExpires = undefined;
        user.verificationStatus.verifiedAt = Date.now();
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (err) {
        next(err);
    }
});

// Logout (optional - client-side should remove token)
router.post("/logout", auth, (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;