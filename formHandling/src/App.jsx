import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateFormPage from "./components/CreateFormPage";
import EditFormPage from "./components/EditFormPage";
import ViewFormPage from "./components/ViewFormPage";
import ViewFormData from "./components/ViewFormData";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <Navbar />
          <div className="">
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
    </ThemeProvider>
  );
};

const Navbar = () => {
  const { dark, toggleTheme } = useTheme();

  return (
    <nav
      className={`flex justify-between items-center p-6 shadow-lg ${
        dark ? "bg-gray-900 text-white" : "bg-slate-500 text-black"
      }`}
    >
      {/* Navigation Links */}
      <div className="flex space-x-8 text-lg font-medium">
        <Link
          to="/"
          className={`hover:text-gray-400 transition duration-300 ${
            dark ? "text-gray-200" : "text-white"
          }`}
        >
          Home
        </Link>
        <Link
          to="/create"
          className={`hover:text-gray-400 transition duration-300 ${
            dark ? "text-gray-200" : "text-white"
          }`}
        >
          Create Form
        </Link>
        <Link
          to="/forms"
          className={`hover:text-gray-400 transition duration-300 ${
            dark ? "text-gray-200" : "text-white"
          }`}
        >
          View Forms
        </Link>
      </div>

      {/* Theme Toggle Switch */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className={`relative w-12 h-6 rounded-full shadow-md focus:outline-none transition duration-300 ${
            dark ? "bg-gray-700" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${
              dark ? "translate-x-6" : "translate-x-0"
            }`}
          ></span>
        </button>
      </div>
    </nav>
  );
};

const HomePage = () => {
  const { dark } = useTheme();

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-screen ${
        dark ? "bg-gray-800 text-white" : "bg-slate-300 text-black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6">
        Welcome to the Form Builder App
      </h1>
      <p className="text-xl max-w-xl text-center">
        Use this application to create, submit, edit, view, delete and manage submitted form dynamically. Click on the links in the navigation bar to get started.
      </p>
    </div>
  );
};



const NotFound = () => {
  const { dark } = useTheme();

  return (
    <div
      className={`text-center p-4 ${
        dark ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold text-red-500">404: Page Not Found</h2>
      <p>
        The page you are looking for does not exist. Please check the URL or go
        back to the home page.
      </p>
    </div>
  );
};

export default App;
