const router = require("express").Router();
const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Test route
router.post("/test", (req, res) => {
  console.log('Agent routes test hit');
  res.json({ message: 'Agent routes working!' });
});

// Register new agent
router.post("/register", upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'idDocument', maxCount: 1 },
  { name: 'licenseDocument', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Received registration request:', {
      body: req.body,
      files: req.files
    });

    const {
      fullName,
      email,
      password,
      phone,
      licenseNumber,
      experience,
      specialization,
      location,
      about
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !phone || !licenseNumber) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check for required files
    if (!req.files?.idDocument?.[0] || !req.files?.licenseDocument?.[0]) {
      return res.status(400).json({
        success: false,
        message: 'ID Document and License Document are required'
      });
    }

    // Check if agent already exists with email, phone, or license number
    const existingAgent = await Agent.findOne({
      $or: [
        { email },
        { phone },
        { licenseNumber }
      ]
    });

    if (existingAgent) {
      // Clean up uploaded files since we won't be using them
      Object.values(req.files).forEach(fileArray => {
        fileArray.forEach(file => {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      });

      let message = 'An agent with this ';
      if (existingAgent.email === email) message += 'email';
      else if (existingAgent.phone === phone) message += 'phone number';
      else message += 'license number';
      message += ' already exists';

      return res.status(400).json({
        success: false,
        message
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new agent
    const newAgent = new Agent({
      name: fullName,
      email,
      password: hashedPassword,
      phone,
      licenseNumber,
      experience: experience || '',
      specialization: specialization || '',
      location: location || '',
      about: about || '',
      status: 'pending',
      profilePhoto: req.files?.profilePhoto?.[0]?.path,
      idDocument: req.files?.idDocument?.[0]?.path,
      licenseDocument: req.files?.licenseDocument?.[0]?.path
    });

    console.log('Creating new agent:', newAgent);

    const savedAgent = await newAgent.save();
    console.log('Agent saved successfully:', savedAgent);

    // Remove password from response
    const { password: _, ...agentInfo } = savedAgent._doc;

    res.status(201).json({
      success: true,
      message: 'Agent application submitted successfully',
      agent: agentInfo
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: "Error during registration",
      error: error.message
    });
  }
});

module.exports = router;