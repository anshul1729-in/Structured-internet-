// Entry point for the React app.
// This file mounts the root App component into the DOM.

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // BrowserRouter enables client‑side routing across the pages.
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

