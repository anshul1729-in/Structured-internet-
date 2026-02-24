// Dashboard page: aggregates information from domains.json to give a high‑level quantitative view.
// There is no authentication or persistence yet, but this still shows useful planning stats (total hours, buckets, etc.).

import React from "react";
import domains from "../data/domains.json";

const headerStyles = {
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

const gridStyles = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)",
  gap: "1.5rem"
};

const cardStyles = {
  borderRadius: "1rem",
  padding: "1rem 1.1rem",
  background: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(148,163,184,0.35)"
};

const cardTitleStyles = {
  fontSize: "0.95rem",
  fontWeight: 600,
  marginBottom: "0.4rem"
};

const statRowStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  marginBottom: "0.4rem"
};

const statLabelStyles = {
  fontSize: "0.8rem",
  color: "#9ca3af"
};

const statValueStyles = {
  fontSize: "1.2rem",
  fontWeight: 700
};

const progressBarOuterStyles = {
  borderRadius: "999px",
  background: "rgba(15,23,42,0.8)",
  border: "1px solid rgba(55,65,81,0.9)",
  overflow: "hidden",
  height: "0.55rem",
  marginTop: "0.35rem"
};

const bucketRowStyles = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.78rem",
  color: "#9ca3af",
  marginTop: "0.3rem"
};

// Helper: sum up all approxHours values that exist.
const totalHours = domains.reduce((sum, d) => (typeof d.approxHours === "number" ? sum + d.approxHours : sum), 0);
const avgHours = Math.round(totalHours / domains.length);

// Simple bucketisation for a quick feel of workload distribution across domains.
const buckets = {
  "Short (≤ 90h)": 0,
  "Medium (91–150h)": 0,
  "Long (> 150h)": 0
};

domains.forEach((d) => {
  if (typeof d.approxHours !== "number") return;
  if (d.approxHours <= 90) buckets["Short (≤ 90h)"] += 1;
  else if (d.approxHours <= 150) buckets["Medium (91–150h)"] += 1;
  else buckets["Long (> 150h)"] += 1;
});

// A notional yearly workload if studying part‑time (around 600 hours/year).
const yearlyLoad = 600;
const yearsAtPartTimePace = totalHours / yearlyLoad;

export default function DashboardPage() {
  return (
    <section>
      <header style={headerStyles}>
        <h2 style={titleStyles}>Learning dashboard</h2>
        <p style={subtitleStyles}>
          Use this dashboard to estimate how much time the full journey might take and which domains are
          heavier than others. The numbers are derived from the credit‑hour estimates in the PDF.
        </p>
      </header>

      <div style={gridStyles}>
        {/* Left column: core stats summarising the overall journey. */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
          <div style={cardStyles}>
            <div style={cardTitleStyles}>Overall study time</div>
            <div style={statRowStyles}>
              <span style={statLabelStyles}>Total across all domains</span>
              <span style={statValueStyles}>{totalHours.toLocaleString()} hours</span>
            </div>
            <div style={statRowStyles}>
              <span style={statLabelStyles}>Average per domain</span>
              <span style={{ ...statValueStyles, fontSize: "1rem" }}>{avgHours} hours</span>
            </div>
            <div style={statRowStyles}>
              <span style={statLabelStyles}>Approx. at 600 h/year</span>
              <span style={{ ...statValueStyles, fontSize: "1rem" }}>{yearsAtPartTimePace.toFixed(1)} years</span>
            </div>
          </div>

          <div style={cardStyles}>
            <div style={cardTitleStyles}>Workload distribution</div>
            {Object.entries(buckets).map(([label, count]) => {
              const percentage = (count / domains.length) * 100;
              return (
                <div key={label} style={{ marginBottom: "0.45rem" }}>
                  <div style={bucketRowStyles}>
                    <span>{label}</span>
                    <span>
                      {count} domain{count === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div style={progressBarOuterStyles}>
                    <div
                      style={{
                        height: "100%",
                        width: `${percentage}%`,
                        background:
                          label === "Short (≤ 90h)"
                            ? "linear-gradient(90deg, #22c55e, #4ade80)"
                            : label === "Medium (91–150h)"
                            ? "linear-gradient(90deg, #eab308, #facc15)"
                            : "linear-gradient(90deg, #ef4444, #f97373)"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: a simple table‑like view to compare domains side by side. */}
        <div style={cardStyles}>
          <div style={cardTitleStyles}>Domain breakdown</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2.1fr) minmax(0, 1fr) minmax(0, 1.1fr)",
              fontSize: "0.78rem",
              color: "#9ca3af",
              marginBottom: "0.4rem"
            }}
          >
            <div>Domain</div>
            <div>Est. time</div>
            <div>Approx. hours</div>
          </div>
          <div style={{ maxHeight: "320px", overflowY: "auto" }}>
            {domains.map((d) => (
              <div
                key={d.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 2.1fr) minmax(0, 1fr) minmax(0, 1.1fr)",
                  fontSize: "0.8rem",
                  padding: "0.25rem 0",
                  borderBottom: "1px solid rgba(31,41,55,0.9)"
                }}
              >
                <div style={{ paddingRight: "0.5rem" }}>{d.name}</div>
                <div style={{ color: "#e5e7eb" }}>{d.estimatedLearningTime}</div>
                <div style={{ color: "#e5e7eb" }}>
                  {typeof d.approxHours === "number" ? d.approxHours : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

