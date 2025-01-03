import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link

const ViewFormPage = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/forms");
        if (!response.ok) throw new Error("Failed to fetch forms");
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching forms.");
      }
    };
    fetchForms();
  }, []);

  const handleDeleteForm = async (formId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this form?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/forms/${formId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete form");
      setForms(forms.filter((form) => form._id !== formId));
      alert("Form deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Error deleting form.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">All Forms</h1>
      {forms.length === 0 ? (
        <p className="text-gray-600">No forms available. Create a new form to get started!</p>
      ) : (
        <div className="space-y-4">
          {forms.map((form) => (
            <div key={form._id} className="p-4 bg-white border rounded-md shadow-sm">
              <h3 className="text-lg font-semibold mb-3">{form.title}</h3>
              <div className="flex gap-4">
                {/* Use Link for navigation */}
                <Link
                  to={`/view/${form._id}`}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${form._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteForm(form._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewFormPage;