import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config";

const ViewFormData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/forms/${id}`);
        const inputs = response.data.inputs || [];

        // Initialize `formValues` with empty strings for each input's _id
        const initialValues = inputs.reduce(
          (acc, input) => ({ ...acc, [input._id]: "" }),
          {}
        );

        setFormData(inputs);
        console.log("inputs:", inputs);
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
    console.log("name:", name, "value:", value);

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
      // Submit form values
      // await axios.post(`${config.API_BASE_URL}/forms/${id}/submit`, formValues);
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
    <div className="max-w-4xl mx-auto p-6">
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
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default ViewFormData;
