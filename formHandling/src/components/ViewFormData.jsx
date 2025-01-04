import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config";
import { useTheme } from "../contexts/ThemeContext"; // Import ThemeContext

const ViewFormData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { dark } = useTheme(); // Using theme context

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/forms/${id}`);
        const inputs = response.data.inputs || [];

        const initialValues = inputs.reduce(
          (acc, input) => ({ ...acc, [input._id]: "" }),
          {}
        );

        setFormData(inputs);
        setFormValues(initialValues);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form data:", error);
        setError("Failed to fetch form data.");
      }
    };
    fetchFormData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const input of formData) {
      if (!formValues[input._id]) {
        setError(`Please fill in the ${input.title} field.`);
        return;
      }
    }

    try {
      console.log("Form submitted:", formValues);
      alert("Form submitted successfully!");
      navigate(`/`);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("There was an error submitting the form.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={`w-full min-h-screen  p-6 ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <div
      className={`max-w-4xl mx-auto p-6 shadow-2xl ${
        dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6">View and Fill Form</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {formData.map((input) => (
          <div key={input._id} className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              {input.title}
            </label>
            <input
              type={input.type || "text"}
              name={input._id}
              value={formValues[input._id] || ""}
              onChange={handleInputChange}
              placeholder={input.placeholder || ""}
              className={`w-full p-3 border rounded-md focus:outline-none ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>
        ))}
        <button
          type="submit"
          className={`w-full px-6 py-3 rounded-md focus:outline-none ${
            dark
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Submit Form
        </button>
      </form>
    </div>
    </div>
  );
};

export default ViewFormData;
