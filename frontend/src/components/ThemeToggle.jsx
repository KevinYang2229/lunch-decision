import React from "react";
import "./ThemeToggle.css";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      className={`theme-toggle glass ${theme}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className="icon-container">
        <span className="sun">☀️</span>
        <span className="moon">🌙</span>
      </div>
    </button>
  );
}

export default ThemeToggle;
