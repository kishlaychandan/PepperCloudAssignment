import mongoose from "mongoose";

const inputSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["email", "text", "password", "number", "date"], // Supported input types
    required: true,
  },
  title: {
    type: String,
    required: true, // Title is mandatory if an input is provided
  },
  placeholder: {
    type: String,
  },
});

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  inputs: [inputSchema], // Array of inputs (optional for user)
});

const Form = mongoose.model("Form", formSchema);

export default Form;
