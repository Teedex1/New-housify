const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
    {
        email: { 
            type: String, 
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        username: {
            type: String, 
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [30, "Username cannot exceed 30 characters"]
        },
        password: {
            type: String, 
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"]
        },
        name: {
            first: { 
                type: String,
                trim: true
            },
            last: { 
                type: String,
                trim: true
            }
        },
        phone: {
            type: String,
            match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, "Please enter a valid phone number"]
        },
        profileImage: {
            url: { type: String, default: "" },
            publicId: { type: String }
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        savedProperties: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property"
        }],
        searchHistory: [{
            query: String,
            timestamp: { type: Date, default: Date.now }
        }],
        preferences: {
            propertyTypes: [{
                type: String,
                enum: ["house", "apartment", "condo", "townhouse", "land", "commercial"]
            }],
            priceRange: {
                min: Number,
                max: Number
            },
            locations: [String],
            notifications: {
                email: { type: Boolean, default: true },
                push: { type: Boolean, default: true }
            }
        },
        status: {
            type: String,
            enum: ["active", "inactive", "suspended"],
            default: "active"
        },
        verificationStatus: {
            isVerified: { type: Boolean, default: false },
            token: String,
            tokenExpires: Date,
            verifiedAt: Date
        },
        passwordReset: {
            token: String,
            tokenExpires: Date,
            lastReset: Date
        },
        refreshToken: {
            token: String,
            expires: Date
        },
        lastLogin: {
            type: Date,
            default: Date.now
        }
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
    if (this.name.first && this.name.last) {
        return `${this.name.first} ${this.name.last}`;
    }
    return this.username;
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

// Generate password reset token
UserSchema.methods.generatePasswordResetToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.passwordReset.token = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire time (1 hour)
    this.passwordReset.tokenExpires = Date.now() + 3600000;

    return resetToken;
};

// Generate email verification token
UserSchema.methods.generateVerificationToken = function() {
    // Generate token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Hash token and set to verification token field
    this.verificationStatus.token = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');

    // Set expire time (24 hours)
    this.verificationStatus.tokenExpires = Date.now() + 86400000;

    return verificationToken;
};

// Generate refresh token
UserSchema.methods.generateRefreshToken = function() {
    // Generate token
    const refreshToken = crypto.randomBytes(64).toString('hex');

    // Hash token and store it
    this.refreshToken.token = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex');

    // Set expire time (7 days)
    this.refreshToken.expires = Date.now() + 7 * 24 * 60 * 60 * 1000;

    return refreshToken;
};

// Indexes for better search performance
UserSchema.index({ 
    username: 1,
    email: 1,
    "name.first": 1,
    "name.last": 1
});

module.exports = mongoose.model("User", UserSchema);