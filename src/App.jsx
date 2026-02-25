// Top‑level application shell.
// Sets up navigation and route configuration for the main pages.

import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { useIsMobile } from "./hooks/useIsMobile";

import HomePage from "./pages/HomePage";
import DomainListPage from "./pages/DomainListPage";
import DomainDetailPage from "./pages/DomainDetailPage";
import RoadmapPage from "./pages/RoadmapPage";
import DashboardPage from "./pages/DashboardPage";

// Simple layout styles to keep things readable without a CSS framework.
const appStyles = {
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a, #020617)",
  color: "#e5e7eb"
};

const navBaseStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
  position: "sticky",
  top: 0,
  zIndex: 10,
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(15, 23, 42, 0.85)"
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
  color: "#cbd5f5",
  border: "1px solid transparent"
};

// Helper to compute active vs inactive link styles.
const navLinkClass = ({ isActive }) => ({
  ...linkBaseStyles,
  backgroundColor: isActive ? "rgba(56, 189, 248, 0.12)" : "transparent",
  borderColor: isActive ? "rgba(56, 189, 248, 0.35)" : "transparent",
  color: isActive ? "#e0f2fe" : "#cbd5f5"
});

const mainBaseStyles = {
  maxWidth: "1120px",
  margin: "0 auto"
};

export default function App() {
  const isMobile = useIsMobile();

  const navStyles = {
    ...navBaseStyles,
    padding: isMobile ? "0.75rem 1rem" : "1rem 2rem",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    gap: isMobile ? "0.75rem" : 0
  };

  const navLinksContainerStyles = {
    ...navLinksContainerBaseStyles,
    flexWrap: isMobile ? "wrap" : "nowrap"
  };

  const mainStyles = {
    ...mainBaseStyles,
    padding: isMobile ? "1.2rem 1.1rem 2rem" : "2rem 2.5rem 3rem"
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

