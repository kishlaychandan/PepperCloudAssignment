import React from "react";
import { useTheme } from "../contexts/ThemeContext";
const FormInput = ({ input, onDelete, onChange }) => {
  const { dark } = useTheme();
  return (
    <div className={`flex ${dark ? "bg-gray-800 text-white" : "bg-slate-300 text-black"} items-center space-x-4 border p-4 rounded-md $ shadow-md`}>
      <div className={`w-full ${dark ? " text-black" : "text-slate-600"}`}>
        <input
          type="text"
          value={input.title}
          onChange={(e) => onChange(input.id, "title", e.target.value)}
          placeholder={`Field Title (${input.type})`}
          className="p-2 mb-2 w-full border rounded-md focus:outline-none"
        />
        <input
          type="text"
          value={input.placeholder}
          onChange={(e) => onChange(input.id, "placeholder", e.target.value)}
          placeholder="Field Placeholder"
          className="p-2 mb-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <button
        onClick={() => onDelete(input.id)}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default FormInput;
