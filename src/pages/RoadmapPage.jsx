// Roadmap page: shows an ordered learning path grouped into stages (Starter, Core CS, Data & Intelligence, Specialisations).
// This follows your Option B preference with a clean vertical timeline, so users can see a suggested progression without being overwhelmed.

import React from "react";
import domains from "../data/domains.json";

const pageHeaderStyles = {
  marginBottom: "1.5rem"
};

const titleStyles = {
  fontSize: "1.6rem",
  fontWeight: 700,
  marginBottom: "0.4rem"
};

const subtitleStyles = {
  fontSize: "0.95rem",
  color: "#d1d5db",
  maxWidth: "40rem"
};

const timelineStyles = {
  position: "relative",
  marginTop: "1.5rem",
  paddingLeft: "1.5rem"
};

const timelineLineStyles = {
  position: "absolute",
  left: "0.55rem",
  top: 0,
  bottom: 0,
  width: "2px",
  background: "linear-gradient(to bottom, rgba(56,189,248,0.9), rgba(129,140,248,0.4))",
  opacity: 0.9
};

const stepWrapperStyles = {
  position: "relative",
  marginBottom: "1.4rem"
};

const stepMarkerStyles = {
  position: "absolute",
  left: "-0.17rem",
  top: "0.25rem",
  width: "0.95rem",
  height: "0.95rem",
  borderRadius: "999px",
  border: "2px solid #38bdf8",
  backgroundColor: "#0f172a",
  boxShadow: "0 0 0 4px rgba(56,189,248,0.2)"
};

const stepCardStyles = {
  marginLeft: "1.2rem",
  borderRadius: "0.9rem",
  padding: "0.8rem 1rem",
  background: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(148,163,184,0.35)"
};

const stageLabelStyles = {
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#a5b4fc",
  marginBottom: "0.15rem"
};

const stepTitleStyles = {
  fontSize: "1rem",
  fontWeight: 600
};

const stepBodyStyles = {
  fontSize: "0.86rem",
  color: "#d1d5db",
  marginTop: "0.35rem"
};

const domainChipListStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.4rem",
  marginTop: "0.45rem"
};

const chipStyles = {
  fontSize: "0.75rem",
  padding: "0.2rem 0.55rem",
  borderRadius: "999px",
  background: "rgba(15,23,42,0.9)",
  border: "1px solid rgba(148,163,184,0.6)",
  color: "#e5e7eb"
};

const metaStyles = {
  fontSize: "0.78rem",
  color: "#9ca3af",
  marginTop: "0.2rem"
};

// Helper to fetch a single domain by id so that roadmap steps stay in sync with domains.json.
const byId = (id) => domains.find((d) => d.id === id);

// Roadmap is grouped into high‑level stages; each stage lists one or more domain ids.
const roadmapStages = [
  {
    id: "starter",
    label: "Stage 1 · Starter foundations",
    description:
      "Start here if you are new to technology. These domains give you the programming and hardware basics required for nearly everything else.",
    domainIds: ["programming-software-development", "computer-architecture-hardware"]
  },
  {
    id: "core-cs",
    label: "Stage 2 · Core computer science",
    description:
      "Once you can code and understand computers, learn how operating systems, networks and databases work under the hood.",
    domainIds: ["operating-systems", "networks-internet", "databases-data-management"]
  },
  {
    id: "platforms-security",
    label: "Stage 3 · Platforms and security",
    description:
      "Deepen your understanding of infrastructure and security so you can deploy reliable, secure systems at scale.",
    domainIds: ["cloud-computing-virtualization", "virtualization-containerization", "cybersecurity"]
  },
  {
    id: "data-ai",
    label: "Stage 4 · Data and intelligence",
    description:
      "Use statistics and machine learning to extract insights and build intelligent systems on top of the foundations you have built.",
    domainIds: ["data-science-statistics", "machine-learning-ai"]
  },
  {
    id: "specialisations",
    label: "Stage 5 · Specialisations and impact",
    description:
      "Pick advanced domains that align with your interests, while staying grounded in the human and legal side of technology.",
    domainIds: [
      "internet-of-things",
      "blockchain-decentralized-systems",
      "immersive-technologies-ar-vr",
      "hci-ux",
      "ethics-privacy-law"
    ]
  }
];

export default function RoadmapPage() {
  return (
    <section>
      <header style={pageHeaderStyles}>
        <h2 style={titleStyles}>Suggested learning roadmap</h2>
        <p style={subtitleStyles}>
          Follow this vertical path as a starting point: build strong foundations first, then add infrastructure,
          data skills and finally advanced specialisations. You can always reorder or skip stages to match your
          background.
        </p>
      </header>

      {/* Vertical timeline: a central line with numbered stages branching off. */}
      <div style={timelineStyles}>
        <div style={timelineLineStyles} />
        {roadmapStages.map((stage, index) => {
          const stageDomains = stage.domainIds
            .map(byId)
            .filter(Boolean); // In case ids drift, we avoid crashing the UI.

          return (
            <div key={stage.id} style={stepWrapperStyles}>
              <div style={stepMarkerStyles} />
              <div style={stepCardStyles}>
                <div style={stageLabelStyles}>
                  {String(index + 1).padStart(2, "0")} • {stage.label}
                </div>
                <div style={stepBodyStyles}>{stage.description}</div>

                {/* Each stage chips out the domains covered so users can recognise names from the Domains list. */}
                <div style={domainChipListStyles}>
                  {stageDomains.map((d) => (
                    <span key={d.id} style={chipStyles}>
                      {d.name}
                    </span>
                  ))}
                </div>

                {/* Time hint summarises duration without requiring users to open each domain detail. */}
                <div style={metaStyles}>
                  Approx. time:{" "}
                  {stageDomains
                    .map((d) => d.estimatedLearningTime)
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

