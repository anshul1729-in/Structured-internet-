// Domain List page: shows all technology domains as cards using data from domains.json.
// This is the main index for browsing the landscape before drilling into an individual domain.

import React from "react";
import domains from "../data/domains.json";
import DomainCard from "../components/DomainCard";

const headerStyles = {
  marginBottom: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem"
};

const titleStyles = {
  fontSize: "1.6rem",
  fontWeight: 700
};

const subtitleStyles = {
  fontSize: "0.95rem",
  color: "#d1d5db",
  maxWidth: "38rem"
};

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "1.2rem"
};

export default function DomainListPage() {
  return (
    <section>
      {/* Page intro explains what the user can do on this screen. */}
      <header style={headerStyles}>
        <h2 style={titleStyles}>All technology domains</h2>
        <p style={subtitleStyles}>
          Browse every major domain from the PDF—hardware, software, networks, data, security and more.
          Click a card to see definitions, key subtopics and recommended learning time in detail.
        </p>
      </header>

      <div style={gridStyles}>
        {/* Each DomainCard is a small, self‑contained summary of a domain. */}
        {domains.map((domain) => (
          <DomainCard key={domain.id} domain={domain} />
        ))}
      </div>
    </section>
  );
}

