// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import config from "../config";
// import { useTheme } from "../contexts/ThemeContext";

// const EditFormPage = () => {
//   const { dark } = useTheme();
//   const { id } = useParams(); // Get the form ID from the URL
//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchForm = async () => {
//       try {
//         const response = await fetch(`${config.API_BASE_URL}/forms/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch form");
//         const data = await response.json();
//         setForm(data);
//       } catch (err) {
//         console.error(err);
//         setError("Could not load the form.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchForm();
//   }, [id]);

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`${config.API_BASE_URL}/forms/${form._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       if (!response.ok) throw new Error("Failed to update form");
//       alert("Form updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Error updating form.");
//     }
//   };

//   if (loading) return <p className="text-center">Loading form...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className={`w-full min-h-screen p-6 ${dark ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
//       <div className={`max-w-4xl mx-auto p-6 ${dark ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg shadow-md`}>
//         <h1 className="text-2xl font-bold mb-4">Edit Form</h1>
//         <input
//           type="text"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           placeholder="Form Title"
//           className={`w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
//         />
//         <div className="space-y-4">
//           {form.inputs.map((input, index) => (
//             <div key={index} className="p-4 bg-white border rounded-md shadow-sm">
//               <p className="text-gray-700 mb-2">
//                 Input Type: <span className="font-semibold">{input.type}</span>
//               </p>
//               <div className="mb-3">
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Input Title</label>
//                 <input
//                   type="text"
//                   value={input.title}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       inputs: form.inputs.map((i, idx) =>
//                         idx === index ? { ...i, title: e.target.value } : i
//                       ),
//                     })
//                   }
//                   placeholder={`Enter title for ${input.type}`}
//                   className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="block text-sm font-semibold text-gray-600 mb-1">Placeholder</label>
//                 <input
//                   type={input.type} // Set the input type to the selected type
//                   value={input.placeholder}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       inputs: form.inputs.map((i, idx) =>
//                         idx === index ? { ...i, placeholder: e.target.value } : i
//                       ),
//                     })
//                   }
//                   placeholder={`Enter placeholder for ${input.type}`}
//                   className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${dark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={handleSave}
//           className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditFormPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

const EditFormPage = () => {
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
    const newInputs = [...form.inputs];
    newInputs[index][e.target.name] = e.target.value;
    setForm({ ...form, inputs: newInputs });
  };

  const handleRemoveInput = (index) => {
    const newInputs = form.inputs.filter((_, i) => i !== index);
    setForm({ ...form, inputs: newInputs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${config.API_BASE_URL}/forms/${id}/edit`,
        form
      );
      navigate("/forms");
    } catch (error) {
      console.error("Error editing form:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Form Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {form.inputs.map((input, index) => (
          <div key={index} className="space-y-2">
            <div>
              <label className="block text-lg font-medium">Field Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-3 border border-gray-300 rounded"
                value={input.title}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Placeholder</label>
              <input
                type="text"
                name="placeholder"
                className="w-full p-3 border border-gray-300 rounded"
                value={input.placeholder}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveInput(index)}
            >
              Remove Field
            </button>
          </div>
        ))}

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
  );
};

export default EditFormPage;
