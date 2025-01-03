import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewFormData = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/forms/${id}`);
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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {form.title}
      </h1>
      <form className="space-y-4">
        {form.inputs.map((input, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              {input.title}
            </label>
            <input
              type={input.type}
              placeholder={input.placeholder}
              readOnly
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
            />
          </div>
        ))}
        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default ViewFormData;