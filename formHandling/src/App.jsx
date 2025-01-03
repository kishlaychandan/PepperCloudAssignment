import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateFormPage from "./components/CreateFormPage";
import EditFormPage from "./components/EditFormPage";
import ViewFormPage from "./components/ViewFormPage";
import ViewFormData from "./components/ViewFormData";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="flex justify-around bg-blue-500 p-4 text-white">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/create" className="hover:text-gray-300">Create Form</Link>
          <Link to="/forms" className="hover:text-gray-300">View Forms</Link>
        </nav>
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateFormPage />} />
            <Route path="/edit/:id" element={<EditFormPage />} />
            <Route path="/view/:id" element={<ViewFormData />} />
            <Route path="/forms" element={<ViewFormPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Home Page Component
const HomePage = () => (
  <div className="text-center">
    <h1 className="text-3xl font-bold mb-4">Welcome to the Form Builder App</h1>
    <p className="text-lg text-gray-700">
      Use this application to create, edit, and manage forms dynamically. Click on the links in the navigation bar to get started.
    </p>
  </div>
);

// 404 Page Component
const NotFound = () => (
  <div className="text-center">
    <h2 className="text-2xl font-bold text-red-500">404: Page Not Found</h2>
    <p className="text-gray-700">
      The page you are looking for does not exist. Please check the URL or go back to the home page.
    </p>
  </div>
);

export default App;
