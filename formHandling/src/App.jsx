import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateFormPage from "./components/CreateFormPage";
import EditFormPage from "./components/EditFormPage";
import ViewFormPage from "./components/ViewFormPage";
import ViewFormData from "./components/ViewFormData";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";

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



const HomePage = () => {
  const { dark } = useTheme();

  return (
    <div
      className={`flex flex-col p-6 text-center justify-center items-center w-full h-screen ${
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
