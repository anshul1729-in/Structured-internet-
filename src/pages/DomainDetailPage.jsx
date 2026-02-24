// Domain Detail page: shows the full definition, key subtopics and learning time for a single domain.
// The domain is looked up by the :id route parameter, which corresponds to the id field in domains.json.

import React from "react";
import { useParams, Link } from "react-router-dom";
import domains from "../data/domains.json";

const backLinkStyles = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  fontSize: "0.8rem",
  marginBottom: "1rem",
  textDecoration: "none",
  color: "#e5e7eb"
};

const titleStyles = {
  fontSize: "1.6rem",
  fontWeight: 700,
  marginBottom: "0.4rem"
};

const metaStyles = {
  fontSize: "0.85rem",
  color: "#a5b4fc",
  marginBottom: "1.1rem"
};

const sectionTitleStyles = {
  fontSize: "0.98rem",
  fontWeight: 600,
  marginTop: "1.3rem",
  marginBottom: "0.5rem"
};

const listStyles = {
  paddingLeft: "1.1rem",
  fontSize: "0.9rem",
  color: "#e5e7eb"
};

export default function DomainDetailPage() {
  const { id } = useParams();

  // Look up the domain object using the URL param.
  const domain = domains.find((d) => d.id === id);

  if (!domain) {
    // If the id is invalid, provide a simple error message and a way back.
    return (
      <section>
        <Link to="/domains" style={backLinkStyles}>
          ← Back to all domains
        </Link>
        <p>We couldn&apos;t find a domain with id &quot;{id}&quot;. Please choose one from the list.</p>
      </section>
    );
  }

  return (
    <section>
      <Link to="/domains" style={backLinkStyles}>
        ← Back to all domains
      </Link>

      {/* Title and high‑level metadata pulled directly from the JSON data. */}
      <h2 style={titleStyles}>{domain.name}</h2>
      <div style={metaStyles}>
        Estimated learning time: <strong>{domain.estimatedLearningTime}</strong>{" "}
        {typeof domain.approxHours === "number" && (
          <span style={{ color: "#9ca3af" }}>({domain.approxHours} hours)</span>
        )}
      </div>

      <p style={{ fontSize: "0.95rem", color: "#d1d5db", maxWidth: "46rem" }}>{domain.definition}</p>

      {/* Subtopics list is a simple unordered list to make scanning easier. */}
      <h3 style={sectionTitleStyles}>Key subtopics</h3>
      <ul style={listStyles}>
        {domain.keySubtopics.map((item, index) => (
          <li key={index} style={{ marginBottom: "0.25rem" }}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

