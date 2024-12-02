const router = require("express").Router();
const Property = require("../models/Property");
const verify = require("../verifyToken");

// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('agent', 'firstName lastName email phone')
      .sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single property
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('agent', 'firstName lastName email phone');
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create property
router.post("/", verify, async (req, res) => {
  try {
    const newProperty = new Property({
      ...req.body,
      agent: req.user.id
    });
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update property
router.put("/:id", verify, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    
    if (property.agent.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "You can only update your own properties" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete property
router.delete("/:id", verify, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.agent.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "You can only delete your own properties" });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Property has been deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get properties by agent
router.get("/agent/:agentId", async (req, res) => {
  try {
    const properties = await Property.find({ agent: req.params.agentId })
      .populate('agent', 'firstName lastName email phone')
      .sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
