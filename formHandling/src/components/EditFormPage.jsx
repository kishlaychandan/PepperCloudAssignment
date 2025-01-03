import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditFormPage = () => {
  const { id } = useParams(); // Use the useParams hook to get the form ID
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/forms/${id}`);
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
      const response = await fetch(`http://localhost:5000/api/forms/${form._id}`, {
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
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Form Title"
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="space-y-4">
        {form.inputs.map((input, index) => (
          <div key={index} className="p-4 bg-white border rounded-md shadow-sm">
            <p className="text-gray-700 mb-2">
              Input Type: <span className="font-semibold">{input.type}</span>
            </p>
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
              placeholder="Input Title"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
  );
};

export default EditFormPage;
