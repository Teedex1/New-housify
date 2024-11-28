const router = require("express").Router();
const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");
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
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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
    console.error('Agent registration error:', error);

    // Clean up uploaded files in case of error
    if (req.files) {
      Object.values(req.files).forEach(fileArray => {
        fileArray.forEach(file => {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      let message = 'An agent with this ';
      switch (field) {
        case 'email':
          message += 'email';
          break;
        case 'phone':
          message += 'phone number';
          break;
        case 'licenseNumber':
          message += 'license number';
          break;
        default:
          message += field;
      }
      message += ' already exists';

      return res.status(400).json({
        success: false,
        message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error submitting agent application',
      error: error.message
    });
  }
});

// Agent signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find agent by email
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check if agent is approved
    if (agent.status !== 'approved') {
      return res.status(403).json({
        success: false,
        message: "Your account is pending approval"
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, agent.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: agent._id, isAdmin: agent.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Remove password from response
    const { password: _, ...agentInfo } = agent._doc;

    res.status(200).json({
      success: true,
      agent: agentInfo,
      token
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      success: false,
      message: "Error during signin",
      error: error.message
    });
  }
});

// Check application status
router.get("/application-status", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      status: agent.status,
      message: getStatusMessage(agent.status)
    });
  } catch (error) {
    console.error("Error checking application status:", error);
    res.status(500).json({
      success: false,
      message: "Error checking application status",
      error: error.message
    });
  }
});

function getStatusMessage(status) {
  switch (status) {
    case 'pending':
      return 'Your application is under review. We will notify you once it has been processed.';
    case 'approved':
      return 'Your application has been approved! You can now sign in to your account.';
    case 'rejected':
      return 'Your application has been rejected. Please contact support for more information.';
    default:
      return 'Unknown application status';
  }
}

//UPADTE
router.put("/:id", verify, async (req, res) => {
  if (req.agent.id === req.params.id || req.agent.isAdmin) {
    if (req.body.password) {
      req.body.password = bcrypt.hash(
        req.body.password,
        'my_secret_key'
      );//.toString();
    }
    try {
      const  updatedAgent = await Agent.findByIdAndUpdate(
        req.params.id,
        {
          $set:req.body
        },
        { new: true }
      );
      res.redirect("/frontend/housify/src/components/templates/LoginForm.js");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only update your account!")
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.agent.id === req.params.id || req.agent.isAdmin) {
    try {
      await Agent.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only delete your account!")
  }
});

//GET
router.get("/find/:id", async (req, res) => {
    try {
      const agent = await Agent.findById(req.params.id);
      const { password, ...info } = agent._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.agent.isAdmin) {
    try {
      const agents = query ? await Agent.find().sort({_id:-1}).limit(5) : await Agent.find();
      res.status(200).json(agents);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users...")
  }
});

//GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const data = await Agent.aggregate([
      {
        $project:{
          month: {$month: "$createdAt"}
        }
      },{
        $group: {
          _id: "$month",
          total: {$sum:1}
        }
      }
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;