import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { useTheme } from "../contexts/ThemeContext"; // Assuming you have this context

const ViewFormData = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const { dark } = useTheme(); // Accessing theme context (dark or light mode)

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/forms/${id}`);
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchFormData();
  }, [id]);

  if (!form) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-screen flex justify-center items-center ${dark ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      <div className="max-w-lg w-full p-6 shadow-2xl rounded-lg">
        <h1
          className={`text-2xl font-bold text-center mb-6 ${
            dark ? "text-white" : "text-gray-800"
          }`}
        >
          {form.title}
        </h1>
        <form className="space-y-4">
          {form.inputs.map((input, index) => (
            <div key={index} className="flex flex-col">
              <label
                className={`font-medium mb-2 ${
                  dark ? "text-white" : "text-gray-700"
                }`}
              >
                {input.title}
              </label>
              <input
                type={input.type}
                placeholder={input.placeholder || "Enter value"}
                value={input.placeholder || ""} // Use the actual value or fallback to an empty string
                readOnly
                className={`border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  dark
                    ? "border-gray-600 bg-gray-700 text-white"
                    : "border-gray-300 bg-gray-100 text-gray-700"
                }`}
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default ViewFormData;
