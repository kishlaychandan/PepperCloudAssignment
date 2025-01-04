import express from "express";
import Form from "../models/form.js";

const router = express.Router();

// Create a new form
router.post("/", async (req, res) => {
  const { title, inputs } = req.body;

  try {
    const newForm = new Form({ title, inputs });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(400).json({ error: "Failed to create form", message: error.message });
  }
});

// Edit an existing form
router.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { title, inputs } = req.body;

  try {
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, inputs },
      { new: true }
    );
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(400).json({ error: "Failed to update form", message: error.message });
  }
});

// Get form by ID (view form)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch form", message: error.message });
  }
});

// Get all forms (Home page)
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find({});
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch forms", message: error.message });
  }
});

// Submit a form (store responses)
router.post("/:id/submit", async (req, res) => {
  const { id } = req.params;
  const { responses } = req.body; // Responses will be an array of input values

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    
    // Optionally store the responses here (e.g., in a separate collection)
    // For now, we'll just return the responses back
    res.status(200).json({ message: "Form submitted successfully", responses });
  } catch (error) {
    res.status(400).json({ error: "Failed to submit form", message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete form", message: error.message });
  }
})
export default router;
