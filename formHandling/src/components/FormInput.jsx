import React from "react";
import { useTheme } from "../contexts/ThemeContext"; // Assuming you have this context set up

const FormInput = ({ input, onDelete, onChange }) => {
  const { dark } = useTheme(); // Accessing the theme from context
  const { id, type, placeholder, title } = input;

  return (
    <div
      className={`p-4 border rounded-md shadow-sm mb-4 ${
        dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <span
          className={`font-semibold ${
            dark ? "text-white" : "text-gray-700"
          }`}
        >
          Type: {type}
        </span>
        <button
          onClick={() => onDelete(id)}
          className={`px-2 py-1 text-sm rounded-md ${
            dark ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
          } text-white focus:outline-none`}
        >
          Delete
        </button>
      </div>
      <div className="mb-3">
        <label
          className={`block text-sm font-semibold ${
            dark ? "text-gray-300" : "text-gray-600"
          } mb-1`}
        >
          Field Name (Title)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange(id, "title", e.target.value)}
          placeholder={`Enter a field name for ${type}`}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            dark
              ? "border-gray-500 text-white bg-gray-800 focus:ring-blue-500"
              : "border-gray-300 text-black bg-white focus:ring-blue-500"
          }`}
        />
      </div>
      <div>
        <label
          className={`block text-sm font-semibold ${
            dark ? "text-gray-300" : "text-gray-600"
          } mb-1`}
        >
          Placeholder
        </label>
        <input
          type={type} // Dynamically set the input type
          value={placeholder}
          onChange={(e) => onChange(id, "placeholder", e.target.value)}
          placeholder={`Enter placeholder for ${type}`}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            dark
              ? "border-gray-500 text-white bg-gray-800 focus:ring-blue-500"
              : "border-gray-300 text-black bg-white focus:ring-blue-500"
          }`}
        />
      </div>
    </div>
  );
};

export default FormInput;
