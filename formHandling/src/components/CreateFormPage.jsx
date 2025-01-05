import React, { useState } from "react";
import FormInput from "./FormInput";
import config from "../config";
import { useTheme } from "../contexts/ThemeContext";

const CreateFormPage = () => {
  const { dark } = useTheme();
  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState([]);
  const [showAddInput, setShowAddInput] = useState(false);
  const [error, setError] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Handle adding new input fields
  const handleAddInput = (type) => {
    const newInput = {
      id: Date.now(),
      type,
      title: "",
      placeholder: "",
    };
    setInputs([...inputs, newInput]);
  };

  // Handle deleting input fields
  const handleDeleteInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  // Save form data
  const handleSaveForm = async () => {
    setError(""); // Clear any previous error messages

    // Validate form title
    if (!title.trim()) {
      setError("Form title cannot be empty!");
      return;
    }

    // Validate each input field
    for (const input of inputs) {
      if (!input.title.trim()) {
        setError(`Please provide a field name (title) for the ${input.type} input.`);
        return;
      }
      if (!input.placeholder.trim()) {
        setError(`Please provide a placeholder for the field "${input.title}" (${input.type}).`);
        return;
      }
    }

    // Send the form data to the backend
    try {
      const response = await fetch(`${config.API_BASE_URL}/forms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, inputs }),
      });

      if (response.ok) {
        alert("Form saved successfully!");
        setTitle("");
        setInputs([]);
        setError("");
      } else {
        alert("Failed to save the form. Please try again.");
      }
    } catch (error) {
      console.error("Error saving the form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Handle drag start
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Handle drop event
  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null) {
      const newInputs = [...inputs];
      const [draggedInput] = newInputs.splice(draggedIndex, 1); // Remove the dragged input
      newInputs.splice(index, 0, draggedInput); // Insert it at the new position
      setInputs(newInputs);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`flex flex-col justify-center items-center w-full min-h-screen p-6 ${dark ? "bg-gray-800 text-white" : "bg-slate-300 text-black"}`}
    >
      <h1 className="text-4xl font-bold mb-8">Create New Form</h1>

      {/* Form Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Write form name: Simple form 1"
        className={`p-1 px-8 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          dark
            ? "border-gray-600 text-white bg-gray-800 focus:ring-blue-500"
            : "border-gray-300 text-black bg-white focus:ring-blue-500"
        }`}
      />
      {/* Title Validation Message */}
      {error && title.trim() === "" && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Show Add Input Button */}
      <button
        onClick={() => setShowAddInput(!showAddInput)}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        {showAddInput ? "Close Add Input" : "Add Input"}
      </button>

      {/* Add Input Types */}
      {showAddInput && (
        <div className="flex flex-wrap gap-4 mt-6">
          {["text", "email", "password", "date", "number"].map((type) => (
            <button
              key={type}
              onClick={() => handleAddInput(type)}
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Display Input Fields */}
      <div className="mt-6 space-y-4 w-full max-w-2xl">
        {inputs.map((input, index) => (
          <div
            key={input.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            className="border cursor-pointer p-1 rounded-md mb-2 bg-white shadow-lg"
          >
            <FormInput
              input={input}
              onDelete={handleDeleteInput}
              onChange={(id, key, value) =>
                setInputs(inputs.map((i) => (i.id === id ? { ...i, [key]: value } : i)))
              }
            />
          </div>
        ))}
      </div>

      {/* Save Form Button */}
      <button
        onClick={handleSaveForm}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Save Form
      </button>
    </div>
  );
};

export default CreateFormPage;
   