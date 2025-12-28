// controllers/municipalityController.js
import Municipality from "../models/municipality.js";

// POST /api/municipalities
export const createMunicipality = async (req, res) => {
  try {
    const municipality = await Municipality.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(municipality);
  } catch (error) {
    console.error("Login Error Details:", error);
    res.status(500).json({ message: "Failed to create municipality" });
  }
};

// GET /api/municipalities
export const getMunicipalities = async (req, res) => {
  try {
    const list = await Municipality.find().populate("createdBy", "name");
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to load municipalities" });
  }
};

// GET /api/municipalities/:id
export const getMunicipalityById = async (req, res) => {
  try {
    const municipality = await Municipality.findById(req.params.id)
      .populate("createdBy", "name");

    if (!municipality)
      return res.status(404).json({ message: "Municipality not found" });

    res.json(municipality);
  } catch (error) {
    res.status(500).json({ message: "Failed to load municipality" });
  }
};

// PATCH /api/municipalities/:id
export const updateMunicipality = async (req, res) => {
  try {
    const updated = await Municipality.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Municipality not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update municipality" });
  }
};
