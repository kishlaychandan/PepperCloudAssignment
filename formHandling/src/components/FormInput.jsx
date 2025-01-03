import React from "react";

const FormInput = ({ input, onDelete, onChange }) => {
  const { id, type, placeholder, title } = input;

  return (
    <div className="p-4 bg-white border rounded-md shadow-sm mb-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-700">Type: {type}</span>
        <button
          onClick={() => onDelete(id)}
          className="px-2 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none"
        >
          Delete
        </button>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange(id, "title", e.target.value)}
          placeholder="Enter title for the input"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Placeholder
        </label>
        <input
          type="text"
          value={placeholder}
          onChange={(e) => onChange(id, "placeholder", e.target.value)}
          placeholder="Enter placeholder text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default FormInput;
