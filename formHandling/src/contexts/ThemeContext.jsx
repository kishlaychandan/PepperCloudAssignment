import React, { createContext, useContext, useEffect, useState } from "react";

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to access theme context
export const useTheme = () => useContext(ThemeContext);

// Theme Provider
export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    // Check localStorage for the saved theme; default to "false" (light mode)
    return localStorage.getItem("dark") === "true";
  });

  // Update localStorage when the theme changes
  useEffect(() => {
    localStorage.setItem("dark", dark);
  }, [dark]);

  // Toggle between dark and light modes
  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
