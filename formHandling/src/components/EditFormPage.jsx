import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { useTheme } from "../contexts/ThemeContext";

const EditFormPage = () => {
  const { dark } = useTheme();
  const { id } = useParams(); // Get the form ID from the URL
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/forms/${id}`);
        if (!response.ok) throw new Error("Failed to fetch form");
        const data = await response.json();
        setForm(data);
      } catch (err) {
        console.error(err);
        setError("Could not load the form.");
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/forms/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to update form");
      alert("Form updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating form.");
    }
  };

  if (loading) return <p className="text-center">Loading form...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className={`w-full min-h-screen p-6 ${dark ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div className={`max-w-4xl mx-auto p-6 ${dark ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg shadow-md`}>
        <h1 className="text-2xl font-bold mb-4">Edit Form</h1>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Form Title"
          className={`w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
        />
        <div className="space-y-4">
          {form.inputs.map((input, index) => (
            <div key={index} className="p-4 bg-white border rounded-md shadow-sm">
              <p className="text-gray-700 mb-2">
                Input Type: <span className="font-semibold">{input.type}</span>
              </p>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-600 mb-1">Input Title</label>
                <input
                  type="text"
                  value={input.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      inputs: form.inputs.map((i, idx) =>
                        idx === index ? { ...i, title: e.target.value } : i
                      ),
                    })
                  }
                  placeholder={`Enter title for ${input.type}`}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-600 mb-1">Placeholder</label>
                <input
                  type={input.type} // Set the input type to the selected type
                  value={input.placeholder}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      inputs: form.inputs.map((i, idx) =>
                        idx === index ? { ...i, placeholder: e.target.value } : i
                      ),
                    })
                  }
                  placeholder={`Enter placeholder for ${input.type}`}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditFormPage;
