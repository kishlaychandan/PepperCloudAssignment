import React from "react";

const FormEditor = ({ input, onChange, onDelete }) => {
  return (
    <div>
      <h3>Edit Input: {input.type}</h3>
      <label>Title:</label>
      <input
        type="text"
        value={input.title}
        onChange={(e) => onChange(input.id, "title", e.target.value)}
      />
      <br />
      <label>Placeholder:</label>
      <input
        type="text"
        value={input.placeholder}
        onChange={(e) => onChange(input.id, "placeholder", e.target.value)}
      />
      <br />
      <button onClick={() => onDelete(input.id)}>Delete Input</button>
    </div>
  );
};

export default FormEditor;
