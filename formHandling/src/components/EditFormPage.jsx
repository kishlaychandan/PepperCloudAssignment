import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";
import { useTheme } from "../contexts/ThemeContext";

const EditFormPage = () => {
  const { dark } = useTheme();
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", inputs: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/forms/${id}`);
        setForm(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    fetchFormData();
  }, [id]);

  const handleInputChange = (index, e) => {
    const updatedInputs = [...form.inputs];
    updatedInputs[index][e.target.name] = e.target.value;
    setForm({ ...form, inputs: updatedInputs });
  };

  const handleRemoveInput = (index) => {
    const updatedInputs = form.inputs.filter((_, i) => i !== index);
    setForm({ ...form, inputs: updatedInputs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.API_BASE_URL}/forms/${id}/edit`, form);
      navigate("/forms");
    } catch (error) {
      console.error("Error editing form:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className={`w-full min-h-screen p-6 ${
        dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto p-6 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6">Edit Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Title */}
          <div>
            <label className="block text-lg font-medium">Form Title</label>
            <input
              type="text"
              className={`w-full p-3 border rounded ${
                dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* Dynamic Form Fields */}
          {form.inputs.map((input, index) => (
            <div
              key={index}
              className={`space-y-2 border p-5 rounded ${
                dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              {/* Field Title */}
              <div>
                <label className="block text-lg font-medium">Field Title</label>
                <input
                  type="text"
                  name="title"
                  className={`w-full p-3 border rounded ${
                    dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                  }`}
                  value={input.title}
                  onChange={(e) => handleInputChange(index, e)}
                  required
                />
              </div>

              {/* Placeholder */}
              <div>
                <label className="block text-lg font-medium">Placeholder</label>
                <input
                  type="text"
                  name="placeholder"
                  className={`w-full p-3 border rounded ${
                    dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                  }`}
                  value={input.placeholder}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>

              {/* Remove Field Button */}
              <button
                type="button"
                className={`bg-red-500 text-white px-3 py-2 rounded ${
                  dark ? "hover:bg-red-600" : "hover:bg-red-400"
                }`}
                onClick={() => handleRemoveInput(index)}
              >
                Remove Field
              </button>
            </div>
          ))}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded"
            >
              Update Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFormPage;
