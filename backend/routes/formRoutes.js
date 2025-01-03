import express from "express";
import {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm,
} from "../controllers/formControllers.js";

const router = express.Router();

// Create a new form
router.post("/", createForm);

// Get all forms
router.get("/", getAllForms);

// Get a form by ID
router.get("/:id", getFormById);

// Update a form
router.put("/:id", updateForm);

// Delete a form
router.delete("/:id", deleteForm);

export default router;
