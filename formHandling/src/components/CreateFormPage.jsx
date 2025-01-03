import React, { useState } from "react";
import FormInput from "./FormInput";

const CreateFormPage = () => {
  const [title, setTitle] = useState("Untitled Form");
  const [inputs, setInputs] = useState([]);
  const [showAddInput, setShowAddInput] = useState(false);

  const handleAddInput = (type) => {
    const newInput = {
      id: Date.now(),
      type,
      title: "",
      placeholder: "",
    };
    setInputs([...inputs, newInput]);
  };

  const handleDeleteInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const handleSaveForm = async () => {
    if (!title.trim()) {
      alert("Form title cannot be empty!");
      return;
    }

    if (inputs.some((input) => !input.title.trim())) {
      alert("All inputs must have a title!");
      return;
    }

    const response = await fetch("http://localhost:5000/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, inputs }),
    });

    if (response.ok) {
      alert("Form saved successfully!");
      setTitle("Untitled Form");
      setInputs([]);
    } else {
      alert("Failed to save the form. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Form</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form Title"
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => setShowAddInput(!showAddInput)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        {showAddInput ? "Close Add Input" : "Add Input"}
      </button>
      {showAddInput && (
        <div className="flex flex-wrap gap-2 mt-4">
          {["text", "email", "password", "date", "number"].map((type) => (
            <button
              key={type}
              onClick={() => handleAddInput(type)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}
      <div className="mt-6 space-y-4">
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            input={input}
            onDelete={handleDeleteInput}
            onChange={(id, key, value) =>
              setInputs(
                inputs.map((i) =>
                  i.id === id ? { ...i, [key]: value } : i
                )
              )
            }
          />
        ))}
      </div>
      <button
        onClick={handleSaveForm}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Save Form
      </button>
    </div>
  );
};

export default CreateFormPage;
