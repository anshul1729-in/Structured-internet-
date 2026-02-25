// Top‑level application shell.
// Sets up navigation and route configuration for the main pages.

import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useIsMobile } from "./hooks/useIsMobile";

import HomePage from "./pages/HomePage";
import DomainListPage from "./pages/DomainListPage";
import DomainDetailPage from "./pages/DomainDetailPage";
import RoadmapPage from "./pages/RoadmapPage";
import DashboardPage from "./pages/DashboardPage";

// Simple layout styles to keep things readable without a CSS framework.
// We keep a "base" object here and theme‑specific values are added inside the App component.
const appBaseStyles = {
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  minHeight: "100vh"
};

const navBaseStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "sticky",
  top: 0,
  zIndex: 10,
  backdropFilter: "blur(10px)"
};

const navLinksContainerBaseStyles = {
  display: "flex",
  gap: "1rem"
};

const linkBaseStyles = {
  padding: "0.4rem 0.75rem",
  borderRadius: "999px",
  fontSize: "0.9rem",
  textDecoration: "none",
  border: "1px solid transparent"
};

const themeToggleButtonBaseStyles = {
  padding: "0.3rem 0.7rem",
  borderRadius: "999px",
  fontSize: "0.8rem",
  cursor: "pointer",
  borderWidth: "1px",
  borderStyle: "solid",
  background: "transparent"
};

const mainBaseStyles = {
  maxWidth: "1120px",
  margin: "0 auto"
};

export default function App() {
  const isMobile = useIsMobile();

  // Theme state controls whether we render the dark or light palette.
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  const isDark = theme === "dark";

  // Persist the current theme so it survives page reloads.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const appStyles = {
    ...appBaseStyles,
    background: isDark ? "linear-gradient(135deg, #0f172a, #020617)" : "linear-gradient(135deg, #e5e7eb, #f9fafb)",
    color: isDark ? "#e5e7eb" : "#020617"
  };

  const navStyles = {
    ...navBaseStyles,
    padding: isMobile ? "0.75rem 1rem" : "1rem 2rem",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    gap: isMobile ? "0.75rem" : 0,
    borderBottom: isDark ? "1px solid rgba(148, 163, 184, 0.25)" : "1px solid rgba(148, 163, 184, 0.45)",
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(248, 250, 252, 0.92)"
  };

  const navLinksContainerStyles = {
    ...navLinksContainerBaseStyles,
    flexWrap: isMobile ? "wrap" : "nowrap"
  };

  const mainStyles = {
    ...mainBaseStyles,
    padding: isMobile ? "1.2rem 1.1rem 2rem" : "2rem 2.5rem 3rem"
  };

  const navLinkClass = ({ isActive }) => ({
    ...linkBaseStyles,
    backgroundColor: isActive
      ? isDark
        ? "rgba(56, 189, 248, 0.16)"
        : "rgba(59, 130, 246, 0.14)"
      : "transparent",
    borderColor: isActive
      ? isDark
        ? "rgba(56, 189, 248, 0.5)"
        : "rgba(59, 130, 246, 0.6)"
      : "transparent",
    color: isDark
      ? isActive
        ? "#e0f2fe"
        : "#cbd5f5"
      : isActive
      ? "#1f2933"
      : "#0f172a"
  });

  const themeToggleButtonStyles = {
    ...themeToggleButtonBaseStyles,
    color: isDark ? "#e5e7eb" : "#0f172a",
    borderColor: isDark ? "rgba(148, 163, 184, 0.6)" : "rgba(148, 163, 184, 0.9)",
    background: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.9)"
  };

  return (
    <div style={appStyles}>
      {/* Global navigation shared across all pages. */}
      <header style={navStyles}>
        <div>
          <div style={{ fontWeight: 700, letterSpacing: "0.06em", fontSize: "0.85rem", textTransform: "uppercase", color: "#38bdf8" }}>
            Tech Navigator
          </div>
          <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
            Map your journey across technology domains
          </div>
        </div>
        <nav style={navLinksContainerStyles}>
          {/* NavLink keeps the active tab highlighted so users always know where they are. */}
          <NavLink to="/" style={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/domains" style={navLinkClass}>
            Domains
          </NavLink>
          <NavLink to="/roadmap" style={navLinkClass}>
            Roadmap
          </NavLink>
          <NavLink to="/dashboard" style={navLinkClass}>
            Dashboard
          </NavLink>

          {/* Theme toggle button lives alongside the navigation and works in both desktop and stacked mobile header layouts. */}
          <button
            type="button"
            onClick={toggleTheme}
            style={themeToggleButtonStyles}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>
      </header>

      {/* Page content area where different routes are rendered. */}
      <main style={mainStyles}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/domains" element={<DomainListPage />} />
          {/* Domain detail uses a dynamic :id param so we can link to each domain. */}
          <Route path="/domains/:id" element={<DomainDetailPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}

