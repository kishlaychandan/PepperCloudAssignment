import mongoose from "mongoose";

// Define the input schema
const inputSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "email", "password", "number", "date"],
    required: true,
  },
  title: { type: String, required: true },
  placeholder: { type: String, required: true },
  // value: { type: String },
});

// Define the form schema
const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    inputs: [inputSchema],
  },
  { timestamps: true }
);

// Create the model for the form
const Form = mongoose.model("Form", formSchema);

export default Form;
