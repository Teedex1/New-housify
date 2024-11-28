const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AgentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: { 
      type: String, 
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true
    },
    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      trim: true,
      unique: true
    },
    experience: {
      type: String,
      default: ''
    },
    specialization: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    about: {
      type: String,
      default: '',
      maxLength: [1000, "About section cannot be more than 1000 characters"]
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending'
    },
    profilePhoto: {
      type: String
    },
    idDocument: {
      type: String,
      required: [true, "ID document is required"]
    },
    licenseDocument: {
      type: String,
      required: [true, "License document is required"]
    },
    properties: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property'
    }],
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }],
    rating: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Hash password before saving
AgentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
AgentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Drop existing indexes and create new ones
AgentSchema.statics.createIndexes = async function() {
  try {
    await this.collection.dropIndexes();
    await this.collection.createIndex({ email: 1 }, { unique: true });
    await this.collection.createIndex({ phone: 1 }, { unique: true });
    await this.collection.createIndex({ licenseNumber: 1 }, { unique: true });
    console.log('Indexes recreated successfully');
  } catch (error) {
    console.error('Error recreating indexes:', error);
  }
};

const Agent = mongoose.model("Agent", AgentSchema);

// Recreate indexes when the application starts
Agent.createIndexes().catch(console.error);

module.exports = Agent;
