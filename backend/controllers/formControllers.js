import Form from "../models/formSchema.js";

// Create a new form
export const createForm = async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    const { title, inputs } = req.body;

    // Validate inputs
    if (!title || !Array.isArray(inputs)) {
      console.log("Invalid form data:");
      return res.status(400).json({ message: "Invalid form data" });
    }

    console.log("Valid form data:");
    
    const newForm = new Form({ title, inputs });
    console.log("New form created:");
    
    await newForm.save();
    console.log("Form saved successfully!");
    
    res.status(201).json({ message: "Form created successfully", form: newForm });
  } catch (error) {
    console.error("Error creating form:", error.message);
    res.status(500).json({ message: "Error creating form", error });
  }
};

// Get all forms
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error });
  }
};

// Get a single form by ID
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form", error });
  }
};

// Update a form
export const updateForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;

    // Validate inputs
    if (!title || !Array.isArray(inputs)) {
      return res.status(400).json({ message: "Invalid form data" });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      { title, inputs, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedForm) return res.status(404).json({ message: "Form not found" });
    res.status(200).json({ message: "Form updated successfully", form: updatedForm });
  } catch (error) {
    res.status(500).json({ message: "Error updating form", error });
  }
};

// Delete a form
export const deleteForm = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) return res.status(404).json({ message: "Form not found" });
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form", error });
  }
};
