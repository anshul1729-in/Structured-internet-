// Reusable card component for showing a compact view of a single domain.
// This is used on the Domain List page and can be reused elsewhere if needed.

import React from "react";
import { Link } from "react-router-dom";

const cardStyles = {
  borderRadius: "1rem",
  padding: "1.1rem 1.2rem",
  background: "rgba(15, 23, 42, 0.9)",
  border: "1px solid rgba(148, 163, 184, 0.3)",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.8)"
};

const titleStyles = {
  fontSize: "1rem",
  fontWeight: 600
};

const descriptionStyles = {
  fontSize: "0.9rem",
  color: "#9ca3af"
};

const metaStyles = {
  fontSize: "0.8rem",
  color: "#a5b4fc"
};

const linkStyles = {
  marginTop: "0.4rem",
  fontSize: "0.85rem",
  alignSelf: "flex-start",
  padding: "0.35rem 0.75rem",
  borderRadius: "999px",
  border: "1px solid rgba(56, 189, 248, 0.5)",
  color: "#e0f2fe",
  textDecoration: "none",
  background: "rgba(8, 47, 73, 0.8)"
};

export default function DomainCard({ domain }) {
  return (
    <article style={cardStyles}>
      <h3 style={titleStyles}>{domain.name}</h3>
      <p style={descriptionStyles}>{domain.shortDescription}</p>
      <div style={metaStyles}>
        Est. learning time: <strong>{domain.estimatedLearningTime}</strong>
      </div>
      {/* Deep-link into the detail page so users can explore a single domain in depth. */}
      <Link to={`/domains/${domain.id}`} style={linkStyles}>
        View details
      </Link>
    </article>
  );
}

