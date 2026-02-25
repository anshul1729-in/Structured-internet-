// Home page: high‑level introduction and entry points into the rest of the app.
// This gives users a gentle overview and quick links into Domains, Roadmap and Dashboard.

import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

const heroLeftStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem"
};

const heroTitleStyles = {
  fontSize: "2.1rem",
  fontWeight: 700,
  lineHeight: 1.2
};

const heroSubtitleStyles = {
  fontSize: "0.98rem",
  color: "#d1d5db",
  maxWidth: "34rem"
};

const ctaRowStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.8rem"
};

const primaryCtaStyles = {
  padding: "0.6rem 1.2rem",
  borderRadius: "999px",
  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
  color: "#0b1120",
  fontWeight: 600,
  fontSize: "0.9rem",
  textDecoration: "none",
  border: "none"
};

const secondaryCtaStyles = {
  padding: "0.55rem 1.1rem",
  borderRadius: "999px",
  background: "transparent",
  color: "#e5e7eb",
  fontSize: "0.88rem",
  textDecoration: "none",
  border: "1px solid rgba(148, 163, 184, 0.5)"
};

const pillStyles = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.25rem 0.65rem",
  borderRadius: "999px",
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#a5b4fc",
  background: "rgba(15, 23, 42, 0.9)",
  border: "1px solid rgba(129, 140, 248, 0.4)",
  alignSelf: "flex-start"
};

const heroRightStyles = {
  borderRadius: "1.5rem",
  padding: "1.2rem 1.4rem",
  background:
    "radial-gradient(circle at top left, rgba(59,130,246,0.35), transparent 55%), radial-gradient(circle at bottom right, rgba(45,212,191,0.32), transparent 55%), rgba(15,23,42,0.9)",
  border: "1px solid rgba(148, 163, 184, 0.4)",
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  boxShadow: "0 25px 60px rgba(15,23,42,0.9)"
};

const statGridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0.8rem",
  marginTop: "0.5rem"
};

const statCardStyles = {
  borderRadius: "0.9rem",
  padding: "0.65rem 0.75rem",
  background: "rgba(15,23,42,0.92)",
  border: "1px solid rgba(148,163,184,0.35)"
};

export default function HomePage() {
  // Detect mobile screens so we can collapse the two‑column hero into a vertical stack.
  const isMobile = useIsMobile();

  const heroStyles = {
    display: "grid",
    gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "minmax(0, 3fr) minmax(0, 2fr)",
    gap: isMobile ? "1.75rem" : "2.5rem",
    alignItems: "center"
  };

  return (
    <section style={heroStyles}>
      {/* Left side: explanation of what Tech Navigator is for. */}
      <div style={heroLeftStyles}>
        <div style={pillStyles}>
          <span>Guided learning map</span>
        </div>
        <h1 style={heroTitleStyles}>
          Navigate the entire tech landscape without getting lost.
        </h1>
        <p style={heroSubtitleStyles}>
          Tech Navigator turns the PDF overview into an interactive map of computer science domains. Explore
          definitions, key subtopics and realistic time commitments so you can plan a university‑style learning
          journey on your own terms.
        </p>
        <div style={ctaRowStyles}>
          {/* Primary CTA pushes users straight into the domain explorer. */}
          <Link to="/domains" style={primaryCtaStyles}>
            Explore all domains
          </Link>
          {/* Secondary CTAs highlight other major pages without overwhelming the user. */}
          <Link to="/roadmap" style={secondaryCtaStyles}>
            View suggested roadmap
          </Link>
          <Link to="/dashboard" style={secondaryCtaStyles}>
            Open learning dashboard
          </Link>
        </div>
      </div>

      {/* Right side: compact dashboard‑style summary using static text for now. On mobile this appears below the text. */}
      <aside style={{ ...heroRightStyles, marginTop: isMobile ? "0.5rem" : 0 }}>
        <div style={{ fontSize: "0.85rem", color: "#e5e7eb", fontWeight: 500 }}>
          Your technology overview at a glance
        </div>
        <div style={{ fontSize: "0.8rem", color: "#cbd5f5" }}>
          The data on this site is extracted from <em>“Comprehensive Map of Technology and the Internet”</em>,
          organised into clear domains with approximate university‑level study times.
        </div>
        <div style={statGridStyles}>
          <div style={statCardStyles}>
            <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Domains covered</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700 }}>15</div>
            <div style={{ fontSize: "0.72rem", color: "#6b7280" }}>From hardware to ethics</div>
          </div>
          <div style={statCardStyles}>
            <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Approx. total hours</div>
            <div style={{ fontSize: "1.35rem", fontWeight: 700 }}>~2,200+</div>
            <div style={{ fontSize: "0.72rem", color: "#6b7280" }}>Equivalent to a CS degree plan</div>
          </div>
          <div style={statCardStyles}>
            <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Starter domains</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>Programming, Architecture, OS</div>
          </div>
          <div style={statCardStyles}>
            <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Advanced specialisations</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>AI, Blockchain, AR/VR</div>
          </div>
        </div>
      </aside>
    </section>
  );
}

