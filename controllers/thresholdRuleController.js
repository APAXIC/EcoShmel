// controllers/thresholdRuleController.js
import ThresholdRule from "../models/ThresholdRule.js";

// POST /api/rules
export const createRule = async (req, res) => {
  try {
    const rule = await ThresholdRule.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(rule);
  } catch (error) {
    console.error("Login Error Details:", error);
    res.status(500).json({ message: "Failed to create rule" });
  }
};

// GET /api/rules
export const getRules = async (req, res) => {
  try {
    const rules = await ThresholdRule.find()
      .populate("sensorId", "uid type")
      .populate("createdBy", "name");

    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: "Failed to load rules" });
  }
};

// GET /api/rules/:id
export const getRuleById = async (req, res) => {
  try {
    const rule = await ThresholdRule.findById(req.params.id)
      .populate("sensorId", "uid type")
      .populate("createdBy", "name");

    if (!rule)
      return res.status(404).json({ message: "Rule not found" });

    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: "Failed to load rule" });
  }
};

// PATCH /api/rules/:id
export const updateRule = async (req, res) => {
  try {
    const updated = await ThresholdRule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Rule not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update rule" });
  }
};
